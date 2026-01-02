import { NextResponse } from 'next/server';
import { getAllNeighborhoods } from '@/lib/db';

const AREAS_PER_SITEMAP = 5000;

export async function GET(
    request: Request,
    context: { params: Promise<{ chunk: string }> }
) {
    const baseUrl = 'https://indiapincode.org';
    const { chunk } = await context.params;
    const chunkNum = parseInt(chunk.replace('.xml', ''));
    const offset = chunkNum * AREAS_PER_SITEMAP;

    const areas = getAllNeighborhoods(AREAS_PER_SITEMAP, offset);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${areas.map(area => `  <url>
    <loc>${baseUrl}/area/${area.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
