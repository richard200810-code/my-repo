import type { APIRoute } from 'astro';
import { sitemapIDs } from '@/lib/seo-data';
import { sitemapXML } from '@/lib/seo';

export const GET: APIRoute = async () => {
  try {
    const [products, stores] = await Promise.all([sitemapIDs('hairextensions'), sitemapIDs('stores')]);
    return new Response(sitemapXML(products, stores), {
      headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
    });
  } catch {
    return new Response('Sitemap temporarily unavailable', { status: 503, headers: { 'Retry-After': '300' } });
  }
};
