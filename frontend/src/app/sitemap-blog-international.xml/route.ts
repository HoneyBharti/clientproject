// SEO INTENT: This sitemap is for our non-US, standalone blog content.
// These pages are valuable but are lower priority than our core US pillar/cluster content.
// By giving them a lower priority (0.5) and less frequent change frequency (monthly),
// we guide crawl budget towards our primary commercial pages while still ensuring these get indexed.

import { NextResponse } from 'next/server';
import { allPosts } from '@/lib/blog-posts';

const baseUrl = 'https://yourlegal.in';
const lastModified = '2024-07-26';

const internationalPosts = allPosts
  .filter(post => post.country && post.country !== 'USA')
  .map(post => post.path);

function generateSitemap(urls: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map((url) => `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>`)
    .join('')}
</urlset>`;
}

export async function GET() {
  const sitemap = generateSitemap(internationalPosts);
  
  return new NextResponse(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
