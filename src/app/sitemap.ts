import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return ["","/products"].map(route => ({ url: 'https://omnimart.corstack.dev' + (route || '/') }));
}
