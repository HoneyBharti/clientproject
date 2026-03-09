// SEO INTENT: This sitemap is for our highest authority "Pillar Pages".
// These pages are the cornerstones of our content strategy for the US market.
// By isolating them and giving them top priority (1.0) and frequent change frequency (weekly),
// we signal to Google that these are the most important pages to crawl and rank for broad, competitive head terms.

import { NextResponse } from 'next/server';
import { allPosts } from '@/lib/blog-posts';

const baseUrl = 'https://yourlegal.in';
const lastModified = '2024-07-26';

// Filter for pillar pages
const pillarPages = allPosts
  .filter(post => post.category === 'Pillar')
  .map(post => post.path);


function generateSitemap(urls: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map((url) => `
    <url>
      <loc>${baseUrl}${url}</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>`)
    .join('')}
</urlset>`;
}

export async function GET() {
  const sitemap = generateSitemap(pillarPages);
  
  return new NextResponse(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
