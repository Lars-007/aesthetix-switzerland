import type { MetadataRoute } from 'next';

const baseUrl = 'https://aesthetix-switzerland.ch';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
