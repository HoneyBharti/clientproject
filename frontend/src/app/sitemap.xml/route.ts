// SEO INTENT: This is the root sitemap index file. Its only job is to point crawlers to the other specialized sitemaps.
// The order is critical for signaling authority: Pillars > Services > Industries > Blog > Countries > Core
// This structure tells search engines to prioritize crawling our most important pages first.

import { NextResponse } from 'next/server';

const baseUrl = 'https://yourlegal.in';
const lastModified = '2024-07-26';

// The list and order of sitemaps are explicitly defined as per the authority-first strategy.
const sitemaps = [
  'sitemap-pillars.xml',
  'sitemap-services.xml',
  'sitemap-industries.xml',
  'sitemap-blog-usa.xml',
  'sitemap-blog-international.xml',
  'sitemap-countries.xml',
  'sitemap-core.xml',
];

export async function GET() {
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemaps
    .map((sitemap) => `
    <sitemap>
      <loc>${baseUrl}/${sitemap}</loc>
      <lastmod>${lastModified}</lastmod>
    </sitemap>`)
    .join('')}
</sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
