/**
 * Fuzzy search utility with support for:
 * - Partial matches
 * - Typos (Levenshtein distance)
 * - Case insensitivity
 * - Accent removal
 * - Space/hyphen normalization
 * - Synonyms (weft, tape, k-tip, i-tip)
 * - Plural support
 * - STRICT ALIAS LOCKING: Known aliases resolve to specific categories and block fallback
 */

// Synonym mappings
const SYNONYMS: Record<string, string[]> = {
  weft: ['weft', 'wefts', 'wft', 'sew in', 'sew-in', 'trama'],
  tape: ['tape', 'tape-in', 'tape in', 'cinta'],
  keratin: ['keratin', 'k-tip', 'ktip', 'k tip', 'queratina'],
  'i-tip': ['i-tip', 'itip', 'i tip', 'micro ring', 'microring', 'micro-ring'],
  feather: ['feather', 'feathering', 'pluma'],
  'clip-in': ['clip-in', 'clip in', 'clipin', 'clip'],
};

// Known aliases that STRICTLY lock to a category (no fallback allowed)
const KNOWN_ALIASES: Record<string, string> = {
  'wft': 'weft',
  'trama': 'weft',
  'weft': 'weft',
  'wefts': 'weft',
  'sew in': 'weft',
  'sew-in': 'weft',
  'tape': 'tape',
  'tape-in': 'tape',
  'tape in': 'tape',
  'cinta': 'tape',
  'keratin': 'keratin',
  'k-tip': 'keratin',
  'ktip': 'keratin',
  'k tip': 'keratin',
  'queratina': 'keratin',
  'i-tip': 'i-tip',
  'itip': 'i-tip',
  'i tip': 'i-tip',
  'micro ring': 'i-tip',
  'microring': 'i-tip',
  'micro-ring': 'i-tip',
  'feather': 'feather',
  'feathering': 'feather',
  'pluma': 'feather',
  'clip': 'clip-in',
  'clip-in': 'clip-in',
  'clip in': 'clip-in',
  'clipin': 'clip-in',
};

// Normalize text: remove accents, lowercase, trim spaces/hyphens
export function normalizeText(text: string): string {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[-\s]+/g, ' ') // Normalize spaces and hyphens
    .trim();
}

// Check if query is a known alias and return the locked category
// Returns { category: string } if it's a known alias, null otherwise
export function checkKnownAlias(query: string): string | null {
  const normalized = normalizeText(query);
  return KNOWN_ALIASES[normalized] || null;
}

// Calculate Levenshtein distance for typo tolerance
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Check if query matches text with typo tolerance
function matchesWithTypos(query: string, text: string, maxDistance: number = 2): boolean {
  const queryWords = query.split(' ');
  const textWords = text.split(' ');

  return queryWords.every(queryWord => {
    return textWords.some(textWord => {
      const distance = levenshteinDistance(queryWord, textWord);
      return distance <= maxDistance || textWord.includes(queryWord);
    });
  });
}

// Expand query with synonyms
export function expandWithSynonyms(query: string): string[] {
  const normalized = normalizeText(query);
  const expanded = [normalized];

  for (const [key, synonymList] of Object.entries(SYNONYMS)) {
    const normalizedKey = normalizeText(key);
    if (normalized.includes(normalizedKey) || normalizedKey.includes(normalized)) {
      synonymList.forEach(synonym => {
        const normalizedSynonym = normalizeText(synonym);
        if (!expanded.includes(normalizedSynonym)) {
          expanded.push(normalizedSynonym);
        }
      });
    }
  }

  return expanded;
}

// Main fuzzy search function with strict alias locking
export function fuzzySearch(query: string, text: string, lockedCategory?: string): boolean {
  if (!query || !text) return false;

  const normalizedQuery = normalizeText(query);
  const normalizedText = normalizeText(text);

  // If a category is locked (from known alias), only match if text contains that category
  if (lockedCategory) {
    // Check if text belongs to the locked category
    const textCategory = getProductCategory(text);
    if (textCategory !== lockedCategory) {
      return false; // Block all other categories
    }
  }

  // Exact match (after normalization)
  if (normalizedText.includes(normalizedQuery)) {
    return true;
  }

  // Partial word match
  const queryWords = normalizedQuery.split(' ');
  if (queryWords.every(word => normalizedText.includes(word))) {
    return true;
  }

  // Typo tolerance (only if no locked category)
  if (!lockedCategory && matchesWithTypos(normalizedQuery, normalizedText)) {
    return true;
  }

  // Synonym matching (only if no locked category)
  if (!lockedCategory) {
    const expandedQueries = expandWithSynonyms(normalizedQuery);
    return expandedQueries.some(expandedQuery => {
      if (normalizedText.includes(expandedQuery)) {
        return true;
      }
      return matchesWithTypos(expandedQuery, normalizedText);
    });
  }

  return false;
}

// Determine product category from search index
function getProductCategory(searchIndex: string): string | null {
  const normalized = normalizeText(searchIndex);
  
  if (normalized.includes('weft') || normalized.includes('wft') || normalized.includes('trama') || normalized.includes('sew in')) {
    return 'weft';
  }
  if (normalized.includes('tape') || normalized.includes('cinta')) {
    return 'tape';
  }
  if (normalized.includes('keratin') || normalized.includes('k-tip') || normalized.includes('queratina')) {
    return 'keratin';
  }
  if (normalized.includes('i-tip') || normalized.includes('micro ring')) {
    return 'i-tip';
  }
  if (normalized.includes('feather') || normalized.includes('pluma')) {
    return 'feather';
  }
  if (normalized.includes('clip')) {
    return 'clip-in';
  }
  
  return null;
}

// Search across multiple fields with optional category lock
export function fuzzySearchMultiField(
  query: string,
  fields: (string | undefined)[],
  lockedCategory?: string
): boolean {
  return fields.some(field => fuzzySearch(query, field || '', lockedCategory));
}

// Calculate similarity between two strings (0-1 scale)
function stringSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a || !b) return 0;

  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;

  if (longer.length === 0) return 1;

  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Calculate token-level similarity (word-by-word matching)
function tokenSimilarity(queryTokens: string[], textTokens: string[]): number {
  if (queryTokens.length === 0) return 0;

  let matchedTokens = 0;
  for (const qt of queryTokens) {
    // Check if any text token matches or is similar to this query token
    const bestMatch = Math.max(
      ...textTokens.map(tt => {
        // Exact substring match
        if (tt.includes(qt) || qt.includes(tt)) return 1;
        // Similarity-based match (for typos)
        return stringSimilarity(qt, tt);
      })
    );
    if (bestMatch > 0.7) matchedTokens++;
  }

  return matchedTokens / queryTokens.length;
}

// Score results for ranking (higher score = better match)
// If a known alias is detected, only score items from that category
export function calculateSearchScore(query: string, text: string, lockedCategory?: string): number {
  if (!query || !text) return 0;

  // If category is locked, check if text belongs to that category
  if (lockedCategory) {
    const textCategory = getProductCategory(text);
    if (textCategory !== lockedCategory) {
      return 0; // Block all other categories
    }
  }

  const normalizedQuery = normalizeText(query);
  const normalizedText = normalizeText(text);

  let score = 0;

  // Exact match (highest priority)
  if (normalizedText === normalizedQuery) {
    return 100;
  }

  // Starts with query
  if (normalizedText.startsWith(normalizedQuery)) {
    score += 80;
  }

  // Contains query as substring
  if (normalizedText.includes(normalizedQuery)) {
    score += 60;
  }

  // Token-level similarity (word-by-word matching)
  const queryTokens = normalizedQuery.split(' ').filter(t => t.length > 0);
  const textTokens = normalizedText.split(' ').filter(t => t.length > 0);
  
  if (queryTokens.length > 0 && textTokens.length > 0) {
    const tokenMatch = tokenSimilarity(queryTokens, textTokens);
    score += tokenMatch * 50;
  }

  // Synonym match (only if no locked category)
  if (!lockedCategory) {
    const expandedQueries = expandWithSynonyms(normalizedQuery);
    if (expandedQueries.some(eq => normalizedText.includes(eq))) {
      score += 30;
    }
  }

  // THRESHOLD ENFORCEMENT: For terms 5+ letters, enforce high threshold
  // This prevents irrelevant matches for longer search terms
  if (normalizedQuery.length >= 5) {
    // For longer queries, require at least 40% relevance
    if (score < 40) {
      return 0;
    }
  } else {
    // For shorter queries, require at least 20% relevance
    if (score < 20) {
      return 0;
    }
  }

  return score;
}

// Create a normalized search index for a product with aliases
export function createProductSearchIndex(product: {
  itemName?: string;
  productType?: string;
  color?: string;
  applicationMethod?: string;
  itemDescription?: string;
  texture?: string;
  hairType?: string;
}): string {
  const fields = [
    product.itemName,
    product.productType,
    product.color,
    product.applicationMethod,
    product.itemDescription,
    product.texture,
    product.hairType
  ];

  // Build base index from all fields
  let index = fields.filter(Boolean).join(' ');

  // Add aliases based on application method and product type - STRICTLY BY CATEGORY
  const appMethod = normalizeText(product.applicationMethod || '');
  const prodType = normalizeText(product.productType || '');
  const itemName = normalizeText(product.itemName || '');

  // Add weft aliases ONLY if it's explicitly a weft product
  // Check for exact weft category matches OR if itemName contains 'weft'
  if (
    appMethod === 'machine weft' ||
    appMethod === 'hand tied weft' ||
    appMethod === 'flat weft' ||
    appMethod === 'double piece flat weft' ||
    appMethod === 'volume weft' ||
    appMethod === 'genius weft' ||
    appMethod === 'genius weft with hole' ||
    appMethod === 'genius up with hole' ||
    appMethod === 'sew in' ||
    appMethod === 'sew-in' ||
    prodType === 'machine weft' ||
    prodType === 'hand tied weft' ||
    prodType === 'flat weft' ||
    prodType === 'double piece flat weft' ||
    prodType === 'volume weft' ||
    prodType === 'genius weft' ||
    prodType === 'genius weft with hole' ||
    prodType === 'genius up with hole' ||
    prodType === 'sew in' ||
    prodType === 'sew-in' ||
    itemName === 'machine weft' ||
    itemName === 'hand tied weft' ||
    itemName === 'flat weft' ||
    itemName === 'double piece flat weft' ||
    itemName === 'volume weft' ||
    itemName === 'genius weft' ||
    itemName === 'genius weft with hole' ||
    itemName === 'genius up with hole' ||
    itemName?.includes('sew in') ||
    itemName?.includes('sew-in') ||
    itemName?.includes('weft')
  ) {
    index += ' weft wefts wft sew in sew-in trama';
  }

  // Add tape aliases ONLY if it's explicitly a tape product
  if (
    appMethod === 'tape in' ||
    appMethod === 'invisible tape in' ||
    appMethod === 'mini tape in' ||
    appMethod === 'seamless tape in' ||
    appMethod === 'long invisible tape in' ||
    appMethod === 'long tape in' ||
    appMethod === 'stitched tape in' ||
    prodType === 'tape in' ||
    prodType === 'invisible tape in' ||
    prodType === 'mini tape in' ||
    prodType === 'seamless tape in' ||
    prodType === 'long invisible tape in' ||
    prodType === 'long tape in' ||
    prodType === 'stitched tape in'
  ) {
    index += ' tape tape-in tape in cinta';
  }

  // Add keratin aliases ONLY if it's explicitly a keratin product
  if (
    appMethod === 'keratin' ||
    appMethod === 'k-tip' ||
    prodType === 'keratin' ||
    prodType === 'k-tip'
  ) {
    index += ' keratin k-tip ktip k tip queratina';
  }

  // Add i-tip aliases ONLY if it's explicitly an i-tip product
  if (
    appMethod === 'i-tip' ||
    appMethod === 'micro ring' ||
    prodType === 'i-tip' ||
    prodType === 'micro ring'
  ) {
    index += ' i-tip itip i tip micro ring microring micro-ring';
  }

  // Add clip aliases ONLY if it's explicitly a clip product
  if (
    appMethod === 'clip in' ||
    appMethod === 'one piece clip in' ||
    appMethod === 'lace clip in' ||
    appMethod === 'pu clip in' ||
    prodType === 'clip in' ||
    prodType === 'one piece clip in' ||
    prodType === 'lace clip in' ||
    prodType === 'pu clip in'
  ) {
    index += ' clip clip-in clipin';
  }

  // Add feather aliases ONLY if it's explicitly a feather product
  if (
    appMethod === 'feather hair weft' ||
    appMethod === 'h6 feather hair extension' ||
    prodType === 'feather hair weft' ||
    prodType === 'h6 feather hair extension'
  ) {
    index += ' feather feathering pluma';
  }

  return normalizeText(index);
}
