import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.dropwater.in';
  
  const staticRoutes = [
    { url: `${baseUrl}`, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/story`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/sustainability`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/for-business`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const productRoutes = [
    { url: `${baseUrl}/products/still-water`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/products/mint-water`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/products/clove-water`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/products/athlete-water`, changeFrequency: 'weekly' as const, priority: 0.9 },
  ];

  const blogRoutes = [
    { url: `${baseUrl}/blog/why-aluminium-cans-alternative-to-plastic`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/blog/what-is-functional-water`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/blog/what-is-clove-water`, changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  const allRoutes = [...staticRoutes, ...productRoutes, ...blogRoutes];

  return allRoutes.map(route => ({
    url: route.url,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
