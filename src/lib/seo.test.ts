import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

async function seo() {
  expect(existsSync(resolve('src/lib/seo.ts')), 'shared route SEO exists').toBe(true);
  const path = './seo'; return import(path);
}

describe('public page SEO', () => {
  it('uses different Spanish titles and HTTPS canonical URLs for every public route', async () => {
    const { PUBLIC_PAGES, getPageSEO } = await seo();
    const titles = Object.keys(PUBLIC_PAGES).map(path => getPageSEO(path).title);
    expect(titles.length).toBe(13);
    expect(new Set(titles).size).toBe(titles.length);
    const page = getPageSEO('/products/?utm_source=test#sistemas');
    expect(page.title).toMatch(/Extensiones/);
    expect(page.canonical).toBe('https://www.luxhair.mx/products');
    expect(page.description.length).toBeGreaterThan(40);
  });
  it('uses public product names and excludes private and unknown pages', async () => {
    const { getPageSEO } = await seo();
    const page = getPageSEO('/products/abc', { name: 'Clip-In Natural', description: '<p>Cabello natural</p>' });
    expect(page.title).toBe('Clip-In Natural | LUX HAIR México');
    expect(page.description).toBe('Cabello natural');
    expect(getPageSEO('/crm').noindex).toBe(true);
    expect(getPageSEO('/debug-images').noindex).toBe(true);
    expect(getPageSEO('/missing').noindex).toBe(true);
  });
  it('builds an XML sitemap with static and actual CMS detail URLs only', async () => {
    const { sitemapXML } = await seo();
    const xml = sitemapXML(['product-1'], ['store-1']);
    expect(xml).toContain('https://www.luxhair.mx/products/product-1');
    expect(xml).toContain('https://www.luxhair.mx/stores/store-1');
    expect((xml.match(/<loc>/g) || []).length).toBe(15);
    expect(xml).not.toContain('/crm');
    expect(xml).not.toContain('/debug-images');
    expect(xml).not.toContain('<lastmod>');
  });
});
