// SEO INTENT: This sitemap lists our main country landing pages.
// These are important navigational hubs but are secondary in authority to our pillar and service pages.
// A priority of 0.6 ensures they are crawled regularly but do not compete with our core content.

import { NextResponse } from 'next/server';

const baseUrl = 'https://yourlegal.in';
const lastModified = '2024-07-26';

const countries = [
    '/usa',
    '/uk',
    '/dubai',
    '/singapore',
    '/australia',
    '/saudi-arabia',
    '/in',
    '/netherlands'
];

function generateSitemap(urls: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map((url) => `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`)
    .join('')}
</urlset>`;
}

export async function GET() {
  const sitemap = generateSitemap(countries);
  
  return new NextResponse(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
