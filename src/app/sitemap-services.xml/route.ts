// SEO INTENT: This sitemap is dedicated to our primary revenue-generating "Service" pages.
// These pages have high commercial intent. By grouping them here with a high priority (0.9),
// we tell search engines that these are critical for our business, encouraging frequent crawling
// and better ranking for commercial queries.

import { NextResponse } from 'next/server';

const baseUrl = 'https://yourlegal.in';
const lastModified = '2024-07-26';

const countries = ['usa', 'dubai', 'uk', 'singapore', 'australia', 'saudi-arabia', 'in', 'netherlands'];
const serviceSubPages = [
    'company-formation', 'annual-compliance', 'tax-compliance', 'bookkeeping', 
    'accounting', 'virtual-cfo', 'payroll', 'cross-border-accounting', 
    'pricing', 'process', 'services'
];

function generateSitemap(urls: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map((url) => `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>`)
    .join('')}
</urlset>`;
}

export async function GET() {
  const serviceUrls = countries.flatMap((country) => 
    serviceSubPages.map(subPage => `/${country}/${subPage}`)
  );

  const sitemap = generateSitemap(serviceUrls);
  
  return new NextResponse(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
