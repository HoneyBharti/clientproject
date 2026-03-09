import { NextResponse } from 'next/server';

const baseUrl = 'https://yourlegal.in';
const lastModified = '2024-07-26';

const staticPages = [
    { url: '/', priority: 1.0 },
    { url: '/why-choose-us', priority: 0.8 },
    { url: '/products', priority: 0.8 },
    { url: '/industries', priority: 0.8 },
    { url: '/global-compliance', priority: 0.8 },
    { url: '/pricing-philosophy', priority: 0.7 },
    { url: '/case-studies', priority: 0.7 },
    { url: '/company/about', priority: 0.6 },
    { url: '/company/partner', priority: 0.6 },
    { url: '/support/contact-sales', priority: 0.6 },
    { url: '/blog', priority: 0.9 },
];

function generateSitemap(pages: { url: string, priority: number }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page.priority.toFixed(1)}</priority>
    </url>`)
    .join('')}
</urlset>`;
}

export async function GET() {
  const sitemap = generateSitemap(staticPages);
  
  return new NextResponse(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
