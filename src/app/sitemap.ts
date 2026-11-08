import { MetadataRoute } from 'next';
import { properties as fallbackProperties } from '@/data/properties';
import { getPropertiesFromNeon } from '@/lib/properties';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://homesbyfarouk.co.ke';

  // Retrieve properties dynamically from database with fallback
  let propertiesList = fallbackProperties;
  try {
    const dbProperties = await getPropertiesFromNeon();
    if (dbProperties && dbProperties.length > 0) {
      propertiesList = dbProperties;
    }
  } catch (error) {
    console.warn('Sitemap generator falling back to static property data:', error);
  }

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/investment-guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic property pages
  const propertyRoutes: MetadataRoute.Sitemap = propertiesList.map((property) => ({
    url: `${baseUrl}/properties/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
