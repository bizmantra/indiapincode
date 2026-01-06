import { MetadataRoute } from 'next';
import { getTotalCounts } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://indiapincode.org';

    // Get exact counts from database
    const counts = getTotalCounts();

    // Calculate number of chunks needed for each type
    const PINCODES_PER_SITEMAP = 5000;
    const AREAS_PER_SITEMAP = 5000;
    const IFSC_PER_SITEMAP = 500;
    const BANK_STATES_PER_SITEMAP = 1000;

    const pincodeChunks = Math.ceil(counts.pincodes / PINCODES_PER_SITEMAP);
    const areaChunks = Math.ceil(counts.neighborhoods / AREAS_PER_SITEMAP);
    const ifscChunks = Math.ceil(counts.ifscCodes / IFSC_PER_SITEMAP);
    const bankStateChunks = Math.ceil(counts.bankStates / BANK_STATES_PER_SITEMAP);

    const sitemaps: MetadataRoute.Sitemap = [
        // Static pages sitemap
        {
            url: `${baseUrl}/sitemap-static.xml`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // States sitemap
        {
            url: `${baseUrl}/sitemap-states.xml`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        // Districts sitemap
        {
            url: `${baseUrl}/sitemap-districts.xml`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Banks sitemap
        {
            url: `${baseUrl}/sitemap-banks.xml`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    // Add pincode sitemap chunks
    for (let i = 0; i < pincodeChunks; i++) {
        sitemaps.push({
            url: `${baseUrl}/sitemap-pincodes/${i}.xml`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        });
    }

    // Add area sitemap chunks
    for (let i = 0; i < areaChunks; i++) {
        sitemaps.push({
            url: `${baseUrl}/sitemap-areas/${i}.xml`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        });
    }

    // Add bank-state sitemap chunks
    for (let i = 0; i < bankStateChunks; i++) {
        sitemaps.push({
            url: `${baseUrl}/sitemap-bank-states/${i}.xml`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        });
    }

    // Add IFSC sitemap chunks
    for (let i = 0; i < ifscChunks; i++) {
        sitemaps.push({
            url: `${baseUrl}/sitemap-ifsc/${i}.xml`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        });
    }

    return sitemaps;
}
