import { NextResponse } from 'next/server';
import { getStates, getDistrictsByState } from '@/lib/db';

export async function GET() {
    const baseUrl = 'https://indiapincode.org';
    const states = getStates();

    const districtUrls: string[] = [];

    for (const state of states) {
        const districts = getDistrictsByState(state.slug);
        for (const district of districts) {
            districtUrls.push(`  <url>
    <loc>${baseUrl}/district/${state.slug}/${district.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
        }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${districtUrls.join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
