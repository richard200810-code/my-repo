# Search Flow Fix - Draft Notes

## Changes Made

### 1. **Added Keywords Field to CMS** ✅
- Added `keywords` field to `hairextensions` collection
- Type: TEXT
- Purpose: Store custom keywords including typos/variations for better search matching
- **Action needed**: Add keywords to "Virgin Brazilian Sew-in Weft" product:
  - `brazilian brazlian brasilian`

### 2. **Updated Entity Type** ✅
- Added `keywords?: string;` to `HairExtensionsandWigs` interface in `/src/lib/fuzzy-search.ts`
- This allows the search index to include custom keywords

### 3. **Fixed tokenMatch Function** ✅
- Enhanced token matching for 3-4 letter tokens
- Now supports Levenshtein distance <= 1 for tokens >= 3 letters
- Previously only worked for 5+ letter tokens
- This enables "brazlian" (7 letters) to match "brazilian" (9 letters) with distance = 1

### 4. **Optimized Search Flow** ✅
- **SearchModal.tsx**: Avoid calling `createProductSearchIndex()` twice per product
  - Now stores searchIndex in intermediate object
  - Reduces computation and ensures consistent scoring
  
- **SearchPanel.tsx**: Same optimization applied
  - Consistent search behavior across both components

### 5. **Verified Scoring Logic** ✅
- Single-token queries (like "brazlian") get 70-point weight for token matches
- Threshold for 5+ letter queries: 60 points minimum
- "brazlian" → "brazilian" match:
  - Token similarity: 1.0 (100% match via tokenMatch)
  - Score: 1.0 × 70 = 70 points ✓ (passes 60-point threshold)

## Testing Checklist

### Test 1: Typo Matching
- [ ] Search for "brazlian" (typo)
- [ ] Should return ONLY "Virgin Brazilian Sew-in Weft"
- [ ] Verify in SearchModal (Cmd+K or Ctrl+K)
- [ ] Verify in SearchPanel (mobile/sidebar search)

### Test 2: Locked Aliases (Weft Category)
- [ ] Search for "wft" → should return 4 Weft products
- [ ] Search for "trama" → should return 4 Weft products
- [ ] Verify no other categories appear

### Test 3: Exact Matches
- [ ] Search for "brazilian" (correct spelling)
- [ ] Should return "Virgin Brazilian Sew-in Weft"

### Test 4: Other Typos
- [ ] Search for "brasilian" (alternate typo)
- [ ] Should return "Virgin Brazilian Sew-in Weft"

## Implementation Steps

1. **Go to Wix Dashboard** → Database → hairextensions collection
2. **Find "Virgin Brazilian Sew-in Weft" product**
3. **Edit the product** and fill the new "Keywords" field with:
   ```
   brazilian brazlian brasilian
   ```
4. **Save as Draft** (do NOT publish)
5. **Test in preview** using SearchModal and SearchPanel
6. **Verify results** match expectations above

## Technical Details

### Search Index Creation
The `createProductSearchIndex()` function now includes:
- Product name, type, color, description, texture, hair type
- **NEW**: Custom keywords field
- Category-specific aliases (weft, tape, keratin, etc.)

### Token Matching Algorithm
```
"brazlian" vs "brazilian"
- Length: 7 vs 9 (both >= 5)
- Levenshtein distance: 1 (one character difference)
- Result: MATCH ✓
```

### Score Calculation
```
Query: "brazlian"
Text: "virgin brazilian sew in weft ... brazilian brazlian brasilian"

1. Normalize both
2. Split into tokens: ["brazlian"] vs ["virgin", "brazilian", "sew", "in", "weft", "brazilian", "brazlian", "brasilian"]
3. Token matching: "brazlian" matches "brazilian" (distance=1) ✓
4. Token similarity: 1/1 = 100%
5. Score: 100% × 70 (single-token weight) = 70 points
6. Threshold check: 70 >= 60 ✓ PASS
```

## Files Modified

1. `/src/lib/fuzzy-search.ts`
   - Updated `createProductSearchIndex()` to include keywords field
   - Enhanced `tokenMatch()` for 3-4 letter tokens

2. `/src/components/SearchModal.tsx`
   - Optimized product search to avoid duplicate index creation

3. `/src/components/SearchPanel.tsx`
   - Optimized product search to avoid duplicate index creation

## Status: DRAFT ONLY
- ✅ Code changes complete
- ⏳ Awaiting CMS data update (keywords field)
- ⏳ Awaiting visual testing
- ⏳ NOT PUBLISHED (draft mode)
