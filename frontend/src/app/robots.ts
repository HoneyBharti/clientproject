import { MetadataRoute } from 'next';

const baseUrl = 'https://yourlegal.in';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/login/',
        '/signup/',
        '/legal/',
        '/company/careers/',
        '/support/help-center/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
