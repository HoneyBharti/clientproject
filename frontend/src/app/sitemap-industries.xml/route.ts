import { NextResponse } from 'next/server';

const baseUrl = 'https://yourlegal.in';
const lastModified = '2024-07-26';
const countries = ['usa', 'dubai', 'uk', 'singapore', 'australia', 'saudi-arabia', 'in', 'netherlands'];
const industrySubPages = [
    'saas', 'ecommerce', 'consulting', 'real-estate', 'logistics', 
    'startups', 'agencies', 'healthcare', 'manufacturing', 'fintech'
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
      <priority>0.7</priority>
    </url>`)
    .join('')}
</urlset>`;
}

export async function GET() {
  const industryPages = countries.flatMap((country) => {
    const baseIndustryPage = `/${country}/industries`;
    const subIndustryPages = industrySubPages.map(industry => `/${country}/industries/${industry}`);
    return [baseIndustryPage, ...subIndustryPages];
  });

  const sitemap = generateSitemap(industryPages);
  
  return new NextResponse(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
