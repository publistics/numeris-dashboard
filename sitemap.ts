import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://getnumeris.com';

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/support`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/dashboard`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ];
}