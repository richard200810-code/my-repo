/**
 * Complete Hair Color Catalog - 165 colors
 * Virgin Hair (63) + Remy Hair (53) + Customized Color Ring (49)
 */

export interface HairColor {
  code: string;
  series: 'virgin' | 'remy' | 'customized' | 'additional';
  seriesLabel: string;
  imageUrl?: string;
  hasImage: boolean;
}

// Base URL for existing images (53 colors with verified images)
const BASE = 'https://static.wixstatic.com/media/37e681_';

// Existing verified image IDs (53 colors)
const existingIds: Record<string, string> = {
  '1': '1e0edffecb9a4e95bb3d7599c0d15577',
  '1B': '209228a6ae26434ba678bcd7fc8d3449',
  '2': 'df4e3c6d2a734b4785d70885f30e47ba',
  '3A': '80f203c6ef37487f80cd21aab0c4a294',
  '4': '38685dcf357541a1a805da379b959f9e',
  '5': 'b4cb94855d6a4676b5012a04d955e272',
  '6': 'b07164ddfb6d45ee9b7fcfd15d92106f',
  '8': '79222f0660af4db58912d898e1bce6d9',
  '12': '7368440b75024c9bb218f2599f5287f3',
  '14': '8970bb88f4a44a0bb43d1d60da5ac0d1',
  '16': '20c92c6b13944161a68d7f7f80b300f1',
  '18': 'f1d8401a82cc4cc3ab3071c980cfc181',
  '20': '7c4fe0536e8f456fab7268fc558b1431',
  '22': '078b3700c7b243a3a2d7f6c3f3623a31',
  '24': '017e135b72274d94b4be9d79ea24b2d1',
  '27': 'd595cc51f089428e9e6713a1d0e2ce3d',
  '30': '3884945455bd496a84e7c0d2b190d98e',
  '33': '4cd2d8ef333f435da56b45cdba1285e6',
  '60': 'ab63da6196b04dd5af7651cdced2e8ed',
  '60A': 'c1075881e11c43c89bbb509add061844',
  '613': '0eb838308b6d4cfa94feb2fc6ba59ae1',
  '99J': '3b84cf7ee4c64dee90dc4068980e2d81',
  '2/4': 'ddba1cfadcbc48aeba19c3b3da7e1440',
  '2/5': 'dd47d409f7c14dcfb839cdb028a3df57',
  '1B/2': 'fe3b588211ba422d85ce37b6563444e8',
  '1B/4': '7bb256e66ca54de1802a8cc0251109ff',
  '4/6': '3ccda312fcee454893f972382b2fb5c5',
  '4/8': '7f04a15660fe4ff992414acc554c3a12',
  '4/27': 'd7fb239a791545c180ecb25213e994bc',
  '6/24': 'dcafe638f3164480acbe2bb1c9c5b5a8',
  '7/20': '4852b61ab1884ab8b587ad134594071c',
  '8/10': '6393f30d5ded43a3b90874f40755a669',
  '8/22': '69b379d9f9db4f99931f567b7daf53b7',
  '9/613': '6f7f1b48720643adb8668e2bbae26214',
  '613/24': 'eb5945b0639044df9976789bdafb5a8d',
  '18/613': 'b1bb281fa4f5477fb648d07710fe59a8',
  '18A/613A': 'edb520d71aa84ebd89ed0c538a27054f',
  'DXB': 'c9ad2812421346c2b5c43db338b49864',
  'DXB/18': '9edfaff7b3b34212b2b43758d7727277',
  'R1B-4': '74f8540abd4647479ec49799c630e8a5',
  'R2-6/27': '3006456f0bf945dfb57b0ee00319b089',
  'R2-4/6': '08b563ecc854424185b4489bd41d0451',
  'R2-DXB/18': '582115066c9e42e395d682c6b4d468dc',
  'R2-6/24': '37475ab3a4c74e1c8e6dc59ae316f3a4',
  'R2-8/10': 'babcaf06bbd6420daafdc8b6e8963c7f',
  'R2-60A': '3cfbd01656e94133af1f483f75601179',
  'Rooted Silver Ash': '1c90e5f9e98d42be869bf42a8ceb7090',
  'R5-7/20': '13e046da0224410eaec251cc8b01044c',
  'R5-8/22': '813df4d3982f497cab26b47052e73bcc',
  'R5-9/613': '754c0443f4da4938a1f43f3a9e191d59',
  'R5-18A/613A': '864ca2fcbbaf434f8d372fae0149dd30',
  'R8-18/22': 'd1d77ddca0ca4a2999283b5558283620',
  'R8-18/613': '6b90a9434a454259995a85bc27fe93d1',
};

// Helper to get image URL for existing colors
function getImageUrl(code: string): string | undefined {
  const id = existingIds[code];
  return id ? `${BASE}${id}~mv2.jpg` : undefined;
}

// VIRGIN HAIR - 63 colors
const virginHair: HairColor[] = [
  { code: '20', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('20'), hasImage: true },
  { code: '22', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('22'), hasImage: true },
  { code: '613', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('613'), hasImage: true },
  { code: '55', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: '1001A', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: '1001', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: '60B', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: '60C', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: '60', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('60'), hasImage: true },
  { code: 'Silver', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'Grey', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: '30', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('30'), hasImage: true },
  { code: '33', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('33'), hasImage: true },
  { code: '530', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: '99J', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('99J'), hasImage: true },
  { code: '1', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('1'), hasImage: true },
  { code: '1A', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: '1B', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('1B'), hasImage: true },
  { code: '2', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('2'), hasImage: true },
  { code: '4', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('4'), hasImage: true },
  { code: '5', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('5'), hasImage: true },
  { code: '5A', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: '6', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('6'), hasImage: true },
  { code: '7', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: '8', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('8'), hasImage: true },
  { code: '8A', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: '9', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: '10', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: '12', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('12'), hasImage: true },
  { code: '14', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('14'), hasImage: true },
  { code: '16', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('16'), hasImage: true },
  { code: '18', series: 'virgin', seriesLabel: 'Virgin Hair', imageUrl: getImageUrl('18'), hasImage: true },
  { code: '18A', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'P9/613', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'VB', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'T5/55', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'T5-9/613', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'T1B-4/8', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'T2-4/8', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'T5-7/20', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'T5/20', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'P7/20', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'P4/8', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'P9/55', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'M4/8', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'M9/55', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'M8/613', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'M18/60', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'T1B/4', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'SB', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'T3/20', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'T5A/60', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'T5A/60B', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'DU', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'M16/60', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'M7/20', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'P55/60', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'P8/613', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'P2/8', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'P18/60', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'M55/60', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'M2/8', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
  { code: 'M9/613', series: 'virgin', seriesLabel: 'Virgin Hair', hasImage: false },
];

// REMY HAIR - 53 colors
const remyHair: HairColor[] = [
  { code: 'Purple', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '99J', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('99J'), hasImage: true },
  { code: 'CL', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'AB', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'NB', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'VB', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'BB', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'SM', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'DU', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'MM', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'BM', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'SB', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '10/24T22', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '4/27T24', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '18/22T60', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'MEI RED', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'RED', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'LIGHT PURPLE', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'MINT', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'SILVER', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'Grey', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'Ivory', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '1001', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '60A', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('60A'), hasImage: true },
  { code: '60', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('60'), hasImage: true },
  { code: '613', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('613'), hasImage: true },
  { code: 'Pearlblond', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: 'Platinum', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '530', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '350', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '33', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('33'), hasImage: true },
  { code: '30', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('30'), hasImage: true },
  { code: '27', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('27'), hasImage: true },
  { code: '24', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('24'), hasImage: true },
  { code: '22A', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '22', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('22'), hasImage: true },
  { code: '20', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('20'), hasImage: true },
  { code: '18A', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '18', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('18'), hasImage: true },
  { code: '14', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('14'), hasImage: true },
  { code: '12', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('12'), hasImage: true },
  { code: '1', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('1'), hasImage: true },
  { code: '1A', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '1B', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('1B'), hasImage: true },
  { code: '2', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('2'), hasImage: true },
  { code: '3', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '4', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('4'), hasImage: true },
  { code: '5', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('5'), hasImage: true },
  { code: '6', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('6'), hasImage: true },
  { code: '7', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '8', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('8'), hasImage: true },
  { code: '10', series: 'remy', seriesLabel: 'Remy Hair', hasImage: false },
  { code: '16', series: 'remy', seriesLabel: 'Remy Hair', imageUrl: getImageUrl('16'), hasImage: true },
];

// CUSTOMIZED COLOR RING - 49 colors
const customizedColorRing: HairColor[] = [
  { code: 'R1B-4', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('R1B-4'), hasImage: true },
  { code: 'R2-6/27', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('R2-6/27'), hasImage: true },
  { code: 'R2-4/6', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('R2-4/6'), hasImage: true },
  { code: 'R2-DXB/18', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('R2-DXB/18'), hasImage: true },
  { code: 'R2-6/24', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('R2-6/24'), hasImage: true },
  { code: 'R2-8/10', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('R2-8/10'), hasImage: true },
  { code: 'R2-60A', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('R2-60A'), hasImage: true },
  { code: 'Rooted Silver Ash', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('Rooted Silver Ash'), hasImage: true },
  { code: 'R5-7/20', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('R5-7/20'), hasImage: true },
  { code: 'R5-8/22', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('R5-8/22'), hasImage: true },
  { code: 'R5-9/613', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('R5-9/613'), hasImage: true },
  { code: 'R5-18A/613A', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('R5-18A/613A'), hasImage: true },
  { code: 'R8-18/22', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('R8-18/22'), hasImage: true },
  { code: 'R8-18/613', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('R8-18/613'), hasImage: true },
  { code: '613', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('613'), hasImage: true },
  { code: '1', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('1'), hasImage: true },
  { code: '1B', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('1B'), hasImage: true },
  { code: '2', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('2'), hasImage: true },
  { code: '3A', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('3A'), hasImage: true },
  { code: '4', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('4'), hasImage: true },
  { code: '5', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('5'), hasImage: true },
  { code: '6', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('6'), hasImage: true },
  { code: '8', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('8'), hasImage: true },
  { code: '2/4', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('2/4'), hasImage: true },
  { code: '2/5', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('2/5'), hasImage: true },
  { code: '1B/2', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('1B/2'), hasImage: true },
  { code: '1B/4', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('1B/4'), hasImage: true },
  { code: '4/6', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('4/6'), hasImage: true },
  { code: '4/8', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('4/8'), hasImage: true },
  { code: '4/27', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('4/27'), hasImage: true },
  { code: '6/2A', series: 'customized', seriesLabel: 'Customized Color Ring', hasImage: false },
  { code: '8/10', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('8/10'), hasImage: true },
  { code: '8/22', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('8/22'), hasImage: true },
  { code: 'DXB', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('DXB'), hasImage: true },
  { code: 'DXB/18', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('DXB/18'), hasImage: true },
  { code: '60A/Silver Ash', series: 'customized', seriesLabel: 'Customized Color Ring', hasImage: false },
  { code: '60', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('60'), hasImage: true },
  { code: '60A', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('60A'), hasImage: true },
  { code: 'Silver Ash', series: 'customized', seriesLabel: 'Customized Color Ring', hasImage: false },
  { code: '20', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('20'), hasImage: true },
  { code: '66', series: 'customized', seriesLabel: 'Customized Color Ring', hasImage: false },
  { code: '7/20', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('7/20'), hasImage: true },
  { code: '18/22', series: 'customized', seriesLabel: 'Customized Color Ring', hasImage: false },
  { code: '18', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('18'), hasImage: true },
  { code: '9/613', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('9/613'), hasImage: true },
  { code: '613/24', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('613/24'), hasImage: true },
  { code: '18/613', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('18/613'), hasImage: true },
  { code: '18A/613A', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('18A/613A'), hasImage: true },
  { code: '30', series: 'customized', seriesLabel: 'Customized Color Ring', imageUrl: getImageUrl('30'), hasImage: true },
];

// Complete catalog
export const allColors: HairColor[] = [...virginHair, ...remyHair, ...customizedColorRing, ...referenciasAdicionales];

// Export by series
export const colorsBySeries = {
  virgin: virginHair,
  remy: remyHair,
  customized: customizedColorRing,
  additional: referenciasAdicionales,
};

// Verify counts
export const colorCounts = {
  virgin: virginHair.length,
  remy: remyHair.length,
  customized: customizedColorRing.length,
  additional: referenciasAdicionales.length,
  total: allColors.length,
};

// Search helper
export function searchColors(query: string): HairColor[] {
  const q = query.toLowerCase().trim();
  if (!q) return allColors;
  return allColors.filter(color => color.code.toLowerCase().includes(q));
}

// Get color by code
export function getColorByCode(code: string): HairColor | undefined {
  return allColors.find(color => color.code === code);
}
