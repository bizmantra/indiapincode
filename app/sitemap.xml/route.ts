import { NextResponse } from 'next/server';
import { getTotalCounts } from '@/lib/db';

export async function GET() {
    const baseUrl = 'https://indiapincode.org';
    const counts = getTotalCounts();

    const PINCODES_PER_SITEMAP = 5000;
    const AREAS_PER_SITEMAP = 5000;
    const IFSC_PER_SITEMAP = 500;
    const BANK_STATES_PER_SITEMAP = 1000;

    const pincodeChunks = Math.ceil(counts.pincodes / PINCODES_PER_SITEMAP);
    const areaChunks = Math.ceil(counts.neighborhoods / AREAS_PER_SITEMAP);
    const ifscChunks = Math.ceil(counts.ifscCodes / IFSC_PER_SITEMAP);
    const bankStateChunks = Math.ceil(counts.bankStates / BANK_STATES_PER_SITEMAP);

    const sitemaps = [
        `${baseUrl}/sitemap-static.xml`,
        `${baseUrl}/sitemap-states.xml`,
        `${baseUrl}/sitemap-districts.xml`,
        `${baseUrl}/sitemap-banks.xml`,
    ];

    for (let i = 0; i < pincodeChunks; i++) {
        sitemaps.push(`${baseUrl}/sitemap-pincodes/${i}.xml`);
    }
    for (let i = 0; i < areaChunks; i++) {
        sitemaps.push(`${baseUrl}/sitemap-areas/${i}.xml`);
    }
    for (let i = 0; i < bankStateChunks; i++) {
        sitemaps.push(`${baseUrl}/sitemap-bank-states/${i}.xml`);
    }
    for (let i = 0; i < ifscChunks; i++) {
        sitemaps.push(`${baseUrl}/sitemap-ifsc/${i}.xml`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(url => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
