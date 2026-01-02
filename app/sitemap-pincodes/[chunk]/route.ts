import { NextResponse } from 'next/server';
import { getAllPincodes } from '@/lib/db';

const PINCODES_PER_SITEMAP = 5000;

export async function GET(
    request: Request,
    context: { params: Promise<{ chunk: string }> }
) {
    const baseUrl = 'https://indiapincode.org';
    const { chunk } = await context.params;
    const chunkNum = parseInt(chunk.replace('.xml', ''));
    const offset = chunkNum * PINCODES_PER_SITEMAP;

    const pincodes = getAllPincodes(PINCODES_PER_SITEMAP, offset);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pincodes.map(pincode => `  <url>
    <loc>${baseUrl}/pincode/${pincode.pincode}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
