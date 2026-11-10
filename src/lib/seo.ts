export const SITE_ORIGIN = 'https://www.luxhair.mx';
export const PUBLIC_PAGES: Record<string, [string, string]> = {
  '/': ['Extensiones de cabello natural en México', 'Conoce LUX HAIR México: extensiones de cabello natural, sistemas de aplicación, accesorios y guías para elegir tu estilo.'],
  '/products': ['Extensiones de cabello: catálogo y sistemas', 'Explora el catálogo LUX HAIR: extensiones de cabello y sistemas como Clip-In, Tape-In, Keratin, Hair Weft y Feather.'],
  '/stores': ['Tiendas y puntos de venta', 'Encuentra las tiendas y puntos de venta de LUX HAIR. Consulta información de cada ubicación y conoce nuestros productos.'],
  '/contact': ['Contacto y asesoría sobre extensiones', 'Contacta a LUX HAIR México para consultar sobre extensiones de cabello, productos, aplicaciones y puntos de venta.'],
  '/academy': ['Academia y guías de extensiones', 'Consulta las guías de LUX HAIR para conocer los sistemas de extensiones, sus aplicaciones y el cuidado del cabello.'],
  '/aplicaciones-hair-weft': ['Hair Weft: guía de aplicación', 'Conoce el sistema Hair Weft de LUX HAIR y consulta su guía de aplicación y cuidado para extensiones en trama.'],
  '/aplicaciones-clip-in': ['Clip-In: guía de aplicación', 'Descubre cómo utilizar extensiones Clip-In con la guía de LUX HAIR: colocación, recomendaciones y cuidado.'],
  '/aplicaciones-tape-in': ['Tape-In: guía de aplicación', 'Consulta la guía Tape-In de LUX HAIR para conocer las extensiones adhesivas, su aplicación y cuidado.'],
  '/aplicaciones-keratin': ['Keratin: guía de aplicación', 'Conoce las extensiones de keratina con la guía de LUX HAIR: sistema de aplicación y recomendaciones de cuidado.'],
  '/aplicaciones-feather': ['Feather: guía de aplicación', 'Explora el sistema Feather de LUX HAIR y su guía de aplicación para conocer esta técnica de extensiones de cabello.'],
  '/aplicaciones/double-piece-flat-weft': ['Double Piece Flat Weft: guía de aplicación', 'Descubre Double Piece Flat Weft de LUX HAIR y consulta los detalles del sistema, su aplicación y recomendaciones.'],
  '/academy/color-ring': ['Carta de colores para extensiones', 'Consulta la carta de colores de LUX HAIR para comparar tonos y elegir el color de tus extensiones de cabello.'],
  '/tools-accessories': ['Herramientas y accesorios para extensiones', 'Explora las herramientas y accesorios LUX HAIR para la aplicación, el mantenimiento y el cuidado de extensiones.'],
};
export type PageSEO = { title: string; description: string; canonical: string; noindex: boolean };
export type PublicDetail = { name?: string; description?: string };
export function normalizePath(value: string): string {
  return new URL(value, SITE_ORIGIN).pathname.replace(/\/+$/, '') || '/';
}
const plainText = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
export function getPageSEO(value: string, detail?: PublicDetail | null): PageSEO {
  const path = normalizePath(value);
  const product = /^\/products\/[^/]+$/.test(path);
  const store = /^\/stores\/[^/]+$/.test(path);
  const known = Object.prototype.hasOwnProperty.call(PUBLIC_PAGES, path);
  const fallback = product ? PUBLIC_PAGES['/products'] : store ? PUBLIC_PAGES['/stores'] : ['Página no disponible', PUBLIC_PAGES['/'][1]];
  const [name, description] = known ? PUBLIC_PAGES[path] : fallback;
  return {
    title: (plainText(detail?.name || name).slice(0, 100)) + ' | LUX HAIR México',
    description: plainText(detail?.description || description).slice(0, 170),
    canonical: SITE_ORIGIN + path,
    // Unlinked store detail records are demo shops, pending real storefront content.
    noindex: store || !known && (!(product || store) || detail === null),
  };
}
export function sitemapXML(products: string[] = [], stores: string[] = []): string {
  const paths = [...Object.keys(PUBLIC_PAGES), ...products.filter(Boolean).map(id => '/products/' + encodeURIComponent(id)), ...stores.filter(Boolean).map(id => '/stores/' + encodeURIComponent(id))];
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + [...new Set(paths)].filter(path => !getPageSEO(path).noindex).map(path => '<url><loc>' + escape(SITE_ORIGIN + path) + '</loc></url>').join('\n') + '\n</urlset>\n';
}
export const MANAGED_META = ['description', 'robots', 'og:title', 'og:description', 'og:url', 'og:locale', 'twitter:title', 'twitter:description'];
export function pageSEOTags(page: PageSEO): Array<{ type: string; props?: Record<string, string>; children?: string }> {
  return [
    { type: 'title', children: page.title },
    { type: 'link', props: { rel: 'canonical', href: page.canonical } },
    ...[
      ['name', 'description', page.description],
      ['name', 'robots', page.noindex ? 'noindex,follow' : 'index,follow'],
      ['property', 'og:title', page.title], ['property', 'og:description', page.description],
      ['property', 'og:url', page.canonical], ['property', 'og:locale', 'es_MX'],
      ['name', 'twitter:title', page.title], ['name', 'twitter:description', page.description],
    ].map(([attribute, key, content]) => ({ type: 'meta', props: { [attribute]: key, content } })),
  ];
}
