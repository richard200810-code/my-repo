import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageSEO, MANAGED_META, pageSEOTags, type PageSEO as PageSEOData } from '@/lib/seo';
import { loadPageSEO } from '@/lib/seo-data';

function applySEO(page: PageSEOData) {
  const selectors = ['title', 'link[rel="canonical"]', ...MANAGED_META.flatMap(key => ['meta[name="' + key + '"]', 'meta[property="' + key + '"]'])];
  document.head.querySelectorAll(selectors.join(',')).forEach(node => node.remove());
  for (const tag of pageSEOTags(page)) {
    const element = document.createElement(tag.type);
    if (tag.children) element.textContent = tag.children;
    for (const [key, value] of Object.entries(tag.props || {})) {
      if (typeof value === 'string') element.setAttribute(key, value);
    }
    document.head.appendChild(element);
  }
  document.documentElement.lang = 'es-MX';
}
export default function PageSEO() {
  const { pathname } = useLocation();
  useEffect(() => {
    let cancelled = false;
    const initial = getPageSEO(pathname);
    if (document.querySelector('link[rel="canonical"]')?.getAttribute('href') !== initial.canonical) applySEO(initial);
    loadPageSEO(pathname).then(page => { if (!cancelled) applySEO(page); });
    return () => { cancelled = true; };
  }, [pathname]);
  return null;
}
