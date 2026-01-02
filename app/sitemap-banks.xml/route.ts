import { NextResponse } from 'next/server';
import { getUniqueBanks } from '@/lib/db';

export async function GET() {
    const baseUrl = 'https://indiapincode.org';
    const banks = getUniqueBanks();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${banks.map(bank => `  <url>
    <loc>${baseUrl}/bank/${bank.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
