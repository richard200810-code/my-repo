import { items } from '@wix/data';
import { getPageSEO, normalizePath } from './seo';

export async function loadPageSEO(value: string) {
  const path = normalizePath(value);
  const match = path.match(/^\/(products|stores)\/([^/]+)$/);
  if (!match) return getPageSEO(path);
  try {
    const collection = match[1] === 'products' ? 'hairextensions' : 'stores';
    const result = await items.query(collection).eq('_id', decodeURIComponent(match[2])).limit(1).find();
    const item = result.items[0];
    return getPageSEO(path, item ? {
      name: match[1] === 'products' ? item.itemName : item.storeName,
      description: match[1] === 'products' ? item.itemDescription : item.description,
    } : null);
  } catch {
    console.warn('Public detail SEO could not be loaded');
    return getPageSEO(path);
  }
}

export async function sitemapIDs(collection: 'hairextensions' | 'stores'): Promise<string[]> {
  const ids: string[] = [];
  for (let skip = 0; ; skip += 1000) {
    const result = await items.query(collection).skip(skip).limit(1000).find();
    ids.push(...result.items.map(item => item._id).filter((id): id is string => typeof id === 'string' && id.length > 0));
    if (result.items.length < 1000) return ids;
  }
}
