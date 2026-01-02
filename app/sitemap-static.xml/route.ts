import { NextResponse } from 'next/server';

export async function GET() {
    const baseUrl = 'https://indiapincode.org';

    const staticPages = [
        { url: '/', priority: 1.0, changefreq: 'daily' },
        { url: '/search', priority: 0.8, changefreq: 'daily' },
        { url: '/state', priority: 0.8, changefreq: 'weekly' },
        { url: '/bank', priority: 0.8, changefreq: 'weekly' },
        { url: '/bank/all', priority: 0.7, changefreq: 'weekly' },
        { url: '/disclaimer', priority: 0.3, changefreq: 'yearly' },
        { url: '/privacy', priority: 0.3, changefreq: 'yearly' },
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
