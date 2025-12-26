import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'pincodes.sqlite');
const db = new Database(dbPath, { readonly: false }); // Set to false to allow index creation

export interface PincodeSummary {
    pincode: number | string;
    state: string;
    district: string;
    taluk: string;
    office_count: number;
}

export interface PostOffice {
    officename: string;
    pincode: number | string;
    officetype: string;
    deliverystatus: string;
    divisionname: string;
    regionname: string;
    circlename: string;
    taluk: string;
    districtname: string;
    statename: string;
}

export function getStates() {
    return db.prepare('SELECT name, slug FROM states ORDER BY name ASC').all() as { name: string, slug: string }[];
}

export function getDistrictsByState(stateSlug: string) {
    return db.prepare(`
        SELECT d.name, d.slug 
        FROM districts d
        JOIN states s ON d.state = s.name
        WHERE s.slug = ?
        ORDER BY d.name ASC
    `).all(stateSlug) as { name: string, slug: string }[];
}

export function getPincodesByDistrict(stateSlug: string, districtSlug: string) {
    return db.prepare(`
        SELECT p.pincode, p.district, p.state, p.office_count
        FROM pincode_summary p
        JOIN districts d ON p.district = d.name
        JOIN states s ON p.state = s.name
        WHERE s.slug = ? AND d.slug = ?
        ORDER BY p.pincode ASC
    `).all(stateSlug, districtSlug) as PincodeSummary[];
}

export function getPincodeDetail(pincode: string) {
    const summary = db.prepare('SELECT * FROM pincode_summary WHERE pincode = ?').get(pincode) as PincodeSummary;
    const offices = db.prepare('SELECT * FROM post_offices WHERE pincode = ?').all(pincode) as PostOffice[];
    return { summary, offices };
}

export function getNearbyPincodes(district: string, currentPincode: string) {
    return db.prepare(`
        SELECT pincode, district, state, office_count
        FROM pincode_summary
        WHERE district = ? AND pincode != ?
        LIMIT 6
    `).all(district, currentPincode) as PincodeSummary[];
}

export function getNeighborhoodDetail(slug: string) {
    return db.prepare('SELECT * FROM neighborhoods WHERE slug = ?').get(slug) as { name: string, pincode: string, district: string, state: string, description: string };
}

export function getNeighborhoodsByPincode(pincode: string) {
    return db.prepare('SELECT name, slug FROM neighborhoods WHERE pincode = ? ORDER BY name ASC').all(pincode) as { name: string, slug: string }[];
}

export function getPopularNeighborhoods(limit: number = 12) {
    // Get neighborhoods from major metros for homepage
    return db.prepare(`
        SELECT name, pincode, slug 
        FROM neighborhoods 
        WHERE pincode IN (
            '560001', '560034', '560095', '560076', -- Bangalore
            '400001', '400053', '400093', '400058', -- Mumbai
            '110001', '110016', '110019', '110092', -- Delhi
            '600001', '600028', '600041' -- Chennai
        )
        LIMIT ?
    `).all(limit) as { name: string, pincode: string, slug: string }[];
}

export function getTopBanks(limit: number = 10) {
    return db.prepare(`
        SELECT bank, bank_slug, COUNT(*) as branch_count
        FROM banks
        GROUP BY bank, bank_slug
        ORDER BY branch_count DESC
        LIMIT ?
    `).all(limit) as { bank: string, bank_slug: string, branch_count: number }[];
}

export function getBanksByPincode(pincode: string) {
    return db.prepare('SELECT * FROM banks WHERE pincode = ? LIMIT 10').all(pincode) as any[];
}

export function getUniqueBanks() {
    return db.prepare('SELECT * FROM unique_banks ORDER BY bank_name ASC').all() as { bank_name: string, slug: string, branch_count: number }[];
}

export function getStatesByBank(bankSlug: string) {
    return db.prepare(`
        SELECT DISTINCT state as name, state_slug as slug 
        FROM banks 
        WHERE bank_slug = ? 
        ORDER BY state ASC
    `).all(bankSlug) as { name: string, slug: string }[];
}

export function getDistrictsByBankState(bankSlug: string, stateSlug: string) {
    return db.prepare(`
        SELECT DISTINCT district as name, district_slug as slug 
        FROM banks 
        WHERE bank_slug = ? AND state_slug = ? 
        ORDER BY district ASC
    `).all(bankSlug, stateSlug) as { name: string, slug: string }[];
}

export function getBranchesByBankDistrict(bankSlug: string, stateSlug: string, districtSlug: string) {
    return db.prepare(`
        SELECT branch as name, ifsc, branch_slug as slug 
        FROM banks 
        WHERE bank_slug = ? AND state_slug = ? AND district_slug = ? 
        ORDER BY branch ASC
    `).all(bankSlug, stateSlug, districtSlug) as { name: string, ifsc: string, slug: string }[];
}

export function getBankByIFSC(ifsc: string) {
    return db.prepare('SELECT * FROM banks WHERE ifsc = ?').get(ifsc) as any;
}

export function searchIFSC(query: string) {
    return db.prepare(`
        SELECT ifsc, bank, branch, district, state 
        FROM banks 
        WHERE ifsc LIKE ? OR bank LIKE ? 
        LIMIT 10
    `).all(`${query.toUpperCase()}%`, `%${query}%`) as any[];
}

export function searchEverything(query: string) {
    // Search Pincodes
    const pincodes = db.prepare('SELECT pincode, district, state FROM pincode_summary WHERE pincode LIKE ? LIMIT 5').all(`${query}%`);

    // Search Neighborhoods - use partial match for better results
    const neighborhoods = db.prepare('SELECT name, pincode, slug FROM neighborhoods WHERE name LIKE ? LIMIT 5').all(`%${query}%`);

    // Search Offices - use partial match for better results
    const offices = db.prepare('SELECT officename, pincode, districtname FROM post_offices WHERE officename LIKE ? LIMIT 5').all(`%${query}%`);

    return { pincodes, neighborhoods, offices };
}

export function searchPincodes(query: string) {
    return db.prepare(`
        SELECT pincode, state, district, office_count
        FROM pincode_summary
        WHERE pincode LIKE ? OR district LIKE ?
        LIMIT 10
    `).all(`${query}%`, `${query}%`) as PincodeSummary[];
}

// Full Text Search & Fuzzy Search Initialization
export function initializeSearchIndex() {
    try {
        // Register Levenshtein function for fuzzy matching
        db.function('levenshtein', (a: string, b: string) => {
            if (!a || !b) return (a || b || "").length;
            const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
            for (let j = 1; j <= b.length; j++) matrix[0][j] = j;
            for (let i = 1; i <= a.length; i++) {
                for (let j = 1; j <= b.length; j++) {
                    matrix[i][j] = a[i - 1] === b[j - 1]
                        ? matrix[i - 1][j - 1]
                        : Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]) + 1;
                }
            }
            return matrix[a.length][b.length];
        });

        // Create FTS5 virtual table if it doesn't exist
        // Note: Removed content='pincode_summary' to make it a self-contained index for multiple tables
        db.exec(`
            CREATE VIRTUAL TABLE IF NOT EXISTS search_index USING fts5(
                content_id,
                type,
                title,
                subtitle,
                slug,
                tokenize='unicode61'
            );
        `);

        // Check if index needs population (simplified check)
        const count = db.prepare('SELECT count(*) as count FROM search_index').get() as { count: number };
        if (count.count === 0) {
            console.log('Normalizing city names (Bangalore -> Bengaluru)...');
            db.exec(`
                -- Normalize district names to Bengaluru
                UPDATE pincode_summary SET district = 'Bengaluru' WHERE district = 'Bangalore';
                UPDATE pincode_summary SET district = 'Bengaluru Rural' WHERE district = 'Bangalore Rural';
                
                UPDATE post_offices SET districtname = 'Bengaluru' WHERE districtname = 'Bangalore';
                UPDATE post_offices SET districtname = 'Bengaluru Rural' WHERE districtname = 'Bangalore Rural';
                
                UPDATE neighborhoods SET district = 'Bengaluru' WHERE district = 'Bangalore';
                UPDATE neighborhoods SET district = 'Bengaluru Rural' WHERE district = 'Bangalore Rural';
                
                UPDATE banks SET district = 'BENGALURU' WHERE district = 'BANGALORE';
                UPDATE banks SET district = 'BENGALURU' WHERE district = 'Bangalore';
            `);

            console.log('Populating search index...');
            db.exec(`
                INSERT INTO search_index(content_id, type, title, subtitle, slug)
                SELECT pincode, 'pincode', pincode, 
                       district || (CASE WHEN district LIKE '%Bengaluru%' THEN ' (Bangalore)' ELSE '' END) || ', ' || state, 
                       pincode FROM pincode_summary;
                
                INSERT INTO search_index(content_id, type, title, subtitle, slug)
                SELECT ifsc, 'bank', bank || ' - ' || branch, 
                       ifsc || (CASE WHEN district LIKE '%BENGALURU%' OR district LIKE '%Bengaluru%' THEN ' (Bangalore)' ELSE '' END), 
                       ifsc FROM banks;
                
                INSERT INTO search_index(content_id, type, title, subtitle, slug)
                SELECT slug, 'area', name, 
                       district || (CASE WHEN district LIKE '%Bengaluru%' THEN ' (Bangalore)' ELSE '' END) || ', ' || state, 
                       slug FROM neighborhoods;
            `);
            console.log('Search index populated successfully.');
        }
    } catch (error) {
        console.error('Search index initialization failed:', error);
    }
}

export function searchFTS(query: string, limit: number = 8) {
    if (!query) return [];

    // First try exact FTS match (very fast)
    let results = db.prepare(`
        SELECT content_id, type, title, subtitle, slug, rank
        FROM search_index 
        WHERE search_index MATCH ?
        ORDER BY rank
        LIMIT ?
    `).all(`${query}*`, limit) as any[];

    // If few results, complement with fuzzy search (slower but typo tolerant)
    if (results.length < 3 && query.length > 3) {
        const fuzzyResults = db.prepare(`
            SELECT content_id, type, title, subtitle, slug, 1 as rank
            FROM search_index
            WHERE levenshtein(title, ?) <= 2 OR title LIKE ?
            LIMIT ?
        `).all(query, `%${query}%`, limit - results.length);

        // Merge without duplicates
        const existingIds = new Set(results.map(r => r.content_id));
        fuzzyResults.forEach((r: any) => {
            if (!existingIds.has(r.content_id)) results.push(r);
        });
    }

    return results;
}

// Initialize on load
initializeSearchIndex();

export default db;
