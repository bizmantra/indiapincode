import { NextResponse } from 'next/server';
import { getAllBankStates } from '@/lib/db';

const BANK_STATES_PER_SITEMAP = 1000;

export async function GET(
    request: Request,
    context: { params: Promise<{ chunk: string }> }
) {
    const baseUrl = 'https://indiapincode.org';
    const { chunk } = await context.params;
    const chunkNum = parseInt(chunk.replace('.xml', ''));

    const allBankStates = getAllBankStates();
    const start = chunkNum * BANK_STATES_PER_SITEMAP;
    const end = start + BANK_STATES_PER_SITEMAP;
    const bankStates = allBankStates.slice(start, end);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${bankStates.map(bs => `  <url>
    <loc>${baseUrl}/bank/${bs.bank_slug}/${bs.state_slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
