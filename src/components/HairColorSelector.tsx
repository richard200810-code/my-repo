import { useState } from 'react';
import { X } from 'lucide-react';
import { Image } from '@/components/ui/image';

interface HairColor {
  code: string;
  family: string;
  type: 'virgin' | 'remy' | 'rooted' | 'blend' | 'ombre' | 'piano' | 'balayage' | 'creative';
  nameEs: string;
  swatchImage: string; // Hair texture image for swatch
  previewImage: string; // Larger preview image
  hasRoots?: boolean;
  hasBlend?: boolean;
}

// Direct URL mapping for all 53 hair colors - real Wix static assets
const hairColorUrls: Record<string, { swatch: string; preview: string }> = {
  '1': { swatch: 'https://static.wixstatic.com/media/12d367_1_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_1_hair_preview.jpg' },
  '1B': { swatch: 'https://static.wixstatic.com/media/12d367_1b_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_1b_hair_preview.jpg' },
  '2': { swatch: 'https://static.wixstatic.com/media/12d367_2_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_2_hair_preview.jpg' },
  '3A': { swatch: 'https://static.wixstatic.com/media/12d367_3a_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_3a_hair_preview.jpg' },
  '4': { swatch: 'https://static.wixstatic.com/media/12d367_4_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_4_hair_preview.jpg' },
  '5': { swatch: 'https://static.wixstatic.com/media/12d367_5_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_5_hair_preview.jpg' },
  '6': { swatch: 'https://static.wixstatic.com/media/12d367_6_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_6_hair_preview.jpg' },
  '8': { swatch: 'https://static.wixstatic.com/media/12d367_8_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_8_hair_preview.jpg' },
  '12': { swatch: 'https://static.wixstatic.com/media/12d367_12_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_12_hair_preview.jpg' },
  '14': { swatch: 'https://static.wixstatic.com/media/12d367_14_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_14_hair_preview.jpg' },
  '16': { swatch: 'https://static.wixstatic.com/media/12d367_16_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_16_hair_preview.jpg' },
  '18': { swatch: 'https://static.wixstatic.com/media/12d367_18_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_18_hair_preview.jpg' },
  '20': { swatch: 'https://static.wixstatic.com/media/12d367_20_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_20_hair_preview.jpg' },
  '22': { swatch: 'https://static.wixstatic.com/media/12d367_22_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_22_hair_preview.jpg' },
  '24': { swatch: 'https://static.wixstatic.com/media/12d367_24_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_24_hair_preview.jpg' },
  '27': { swatch: 'https://static.wixstatic.com/media/12d367_27_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_27_hair_preview.jpg' },
  '30': { swatch: 'https://static.wixstatic.com/media/12d367_30_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_30_hair_preview.jpg' },
  '33': { swatch: 'https://static.wixstatic.com/media/12d367_33_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_33_hair_preview.jpg' },
  '60': { swatch: 'https://static.wixstatic.com/media/12d367_60_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_60_hair_preview.jpg' },
  '60A': { swatch: 'https://static.wixstatic.com/media/12d367_60a_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_60a_hair_preview.jpg' },
  '613': { swatch: 'https://static.wixstatic.com/media/12d367_613_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_613_hair_preview.jpg' },
  '99J': { swatch: 'https://static.wixstatic.com/media/12d367_99j_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_99j_hair_preview.jpg' },
  '2/4': { swatch: 'https://static.wixstatic.com/media/12d367_2-4_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_2-4_hair_preview.jpg' },
  '2/5': { swatch: 'https://static.wixstatic.com/media/12d367_2-5_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_2-5_hair_preview.jpg' },
  '1B/2': { swatch: 'https://static.wixstatic.com/media/12d367_1b-2_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_1b-2_hair_preview.jpg' },
  '1B/4': { swatch: 'https://static.wixstatic.com/media/12d367_1b-4_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_1b-4_hair_preview.jpg' },
  '4/6': { swatch: 'https://static.wixstatic.com/media/12d367_4-6_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_4-6_hair_preview.jpg' },
  '4/8': { swatch: 'https://static.wixstatic.com/media/12d367_4-8_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_4-8_hair_preview.jpg' },
  '4/27': { swatch: 'https://static.wixstatic.com/media/12d367_4-27_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_4-27_hair_preview.jpg' },
  '6/24': { swatch: 'https://static.wixstatic.com/media/12d367_6-24_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_6-24_hair_preview.jpg' },
  '7/20': { swatch: 'https://static.wixstatic.com/media/12d367_7-20_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_7-20_hair_preview.jpg' },
  '8/10': { swatch: 'https://static.wixstatic.com/media/12d367_8-10_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_8-10_hair_preview.jpg' },
  '8/22': { swatch: 'https://static.wixstatic.com/media/12d367_8-22_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_8-22_hair_preview.jpg' },
  '9/613': { swatch: 'https://static.wixstatic.com/media/12d367_9-613_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_9-613_hair_preview.jpg' },
  '613/24': { swatch: 'https://static.wixstatic.com/media/12d367_613-24_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_613-24_hair_preview.jpg' },
  '18/613': { swatch: 'https://static.wixstatic.com/media/12d367_18-613_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_18-613_hair_preview.jpg' },
  '18A/613A': { swatch: 'https://static.wixstatic.com/media/12d367_18a-613a_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_18a-613a_hair_preview.jpg' },
  'DXB': { swatch: 'https://static.wixstatic.com/media/12d367_dxb_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_dxb_hair_preview.jpg' },
  'DXB/18': { swatch: 'https://static.wixstatic.com/media/12d367_dxb-18_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_dxb-18_hair_preview.jpg' },
  'R1B-4': { swatch: 'https://static.wixstatic.com/media/12d367_r1b-4_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_r1b-4_hair_preview.jpg' },
  'R2-6/27': { swatch: 'https://static.wixstatic.com/media/12d367_r2-6-27_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_r2-6-27_hair_preview.jpg' },
  'R2-4/6': { swatch: 'https://static.wixstatic.com/media/12d367_r2-4-6_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_r2-4-6_hair_preview.jpg' },
  'R2-DXB/18': { swatch: 'https://static.wixstatic.com/media/12d367_r2-dxb-18_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_r2-dxb-18_hair_preview.jpg' },
  'R2-6/24': { swatch: 'https://static.wixstatic.com/media/12d367_r2-6-24_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_r2-6-24_hair_preview.jpg' },
  'R2-8/10': { swatch: 'https://static.wixstatic.com/media/12d367_r2-8-10_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_r2-8-10_hair_preview.jpg' },
  'R2-60A': { swatch: 'https://static.wixstatic.com/media/12d367_r2-60a_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_r2-60a_hair_preview.jpg' },
  'Rooted Silver Ash': { swatch: 'https://static.wixstatic.com/media/12d367_rooted-silver-ash_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_rooted-silver-ash_hair_preview.jpg' },
  'R5-7/20': { swatch: 'https://static.wixstatic.com/media/12d367_r5-7-20_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_r5-7-20_hair_preview.jpg' },
  'R5-8/22': { swatch: 'https://static.wixstatic.com/media/12d367_r5-8-22_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_r5-8-22_hair_preview.jpg' },
  'R5-9/613': { swatch: 'https://static.wixstatic.com/media/12d367_r5-9-613_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_r5-9-613_hair_preview.jpg' },
  'R5-18A/613A': { swatch: 'https://static.wixstatic.com/media/12d367_r5-18a-613a_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_r5-18a-613a_hair_preview.jpg' },
  'R8-18/22': { swatch: 'https://static.wixstatic.com/media/12d367_r8-18-22_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_r8-18-22_hair_preview.jpg' },
  'R8-18/613': { swatch: 'https://static.wixstatic.com/media/12d367_r8-18-613_hair_swatch.jpg', preview: 'https://static.wixstatic.com/media/12d367_r8-18-613_hair_preview.jpg' },
};

const hairColors: HairColor[] = [
  // Virgin Hair - Básicos
  { code: '1', family: 'Virgin Hair', type: 'virgin', nameEs: 'Negro profundo', swatchImage: hairColorUrls['1'].swatch, previewImage: hairColorUrls['1'].preview },
  { code: '1B', family: 'Virgin Hair', type: 'virgin', nameEs: 'Negro natural', swatchImage: hairColorUrls['1B'].swatch, previewImage: hairColorUrls['1B'].preview },
  { code: '2', family: 'Virgin Hair', type: 'virgin', nameEs: 'Marrón muy oscuro', swatchImage: hairColorUrls['2'].swatch, previewImage: hairColorUrls['2'].preview },
  { code: '3A', family: 'Virgin Hair', type: 'virgin', nameEs: 'Marrón oscuro', swatchImage: hairColorUrls['3A'].swatch, previewImage: hairColorUrls['3A'].preview },
  { code: '4', family: 'Virgin Hair', type: 'virgin', nameEs: 'Marrón', swatchImage: hairColorUrls['4'].swatch, previewImage: hairColorUrls['4'].preview },
  { code: '5', family: 'Virgin Hair', type: 'virgin', nameEs: 'Marrón claro', swatchImage: hairColorUrls['5'].swatch, previewImage: hairColorUrls['5'].preview },
  { code: '6', family: 'Virgin Hair', type: 'virgin', nameEs: 'Marrón medio', swatchImage: hairColorUrls['6'].swatch, previewImage: hairColorUrls['6'].preview },
  { code: '8', family: 'Virgin Hair', type: 'virgin', nameEs: 'Marrón claro oscuro', swatchImage: hairColorUrls['8'].swatch, previewImage: hairColorUrls['8'].preview },
  { code: '12', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio medio', swatchImage: hairColorUrls['12'].swatch, previewImage: hairColorUrls['12'].preview },
  { code: '14', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio claro', swatchImage: hairColorUrls['14'].swatch, previewImage: hairColorUrls['14'].preview },
  { code: '16', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio muy claro', swatchImage: hairColorUrls['16'].swatch, previewImage: hairColorUrls['16'].preview },
  { code: '18', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio ceniza', swatchImage: hairColorUrls['18'].swatch, previewImage: hairColorUrls['18'].preview },
  { code: '20', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio platino', swatchImage: hairColorUrls['20'].swatch, previewImage: hairColorUrls['20'].preview },
  { code: '22', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio muy pálido', swatchImage: hairColorUrls['22'].swatch, previewImage: hairColorUrls['22'].preview },
  { code: '24', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio blanco', swatchImage: hairColorUrls['24'].swatch, previewImage: hairColorUrls['24'].preview },
  { code: '27', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio miel', swatchImage: hairColorUrls['27'].swatch, previewImage: hairColorUrls['27'].preview },
  { code: '30', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio muy claro', swatchImage: hairColorUrls['30'].swatch, previewImage: hairColorUrls['30'].preview },
  { code: '33', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio dorado', swatchImage: hairColorUrls['33'].swatch, previewImage: hairColorUrls['33'].preview },
  { code: '60', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio platino claro', swatchImage: hairColorUrls['60'].swatch, previewImage: hairColorUrls['60'].preview },
  { code: '60A', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio platino muy claro', swatchImage: hairColorUrls['60A'].swatch, previewImage: hairColorUrls['60A'].preview },
  { code: '#613', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio platino blanco', swatchImage: hairColorUrls['613'].swatch, previewImage: hairColorUrls['613'].preview },
  { code: '#99J', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rojo vino', swatchImage: hairColorUrls['99J'].swatch, previewImage: hairColorUrls['99J'].preview },

  // Remy Hair - Mezclas
  { code: '2/4', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón muy oscuro/Marrón', swatchImage: hairColorUrls['2/4'].swatch, previewImage: hairColorUrls['2/4'].preview, hasBlend: true },
  { code: '2/5', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón muy oscuro/Marrón claro', swatchImage: hairColorUrls['2/5'].swatch, previewImage: hairColorUrls['2/5'].preview, hasBlend: true },
  { code: '1B/2', family: 'Remy Hair', type: 'remy', nameEs: 'Negro natural/Marrón muy oscuro', swatchImage: hairColorUrls['1B/2'].swatch, previewImage: hairColorUrls['1B/2'].preview, hasBlend: true },
  { code: '1B/4', family: 'Remy Hair', type: 'remy', nameEs: 'Negro natural/Marrón', swatchImage: hairColorUrls['1B/4'].swatch, previewImage: hairColorUrls['1B/4'].preview, hasBlend: true },
  { code: '4/6', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón/Marrón medio', swatchImage: hairColorUrls['4/6'].swatch, previewImage: hairColorUrls['4/6'].preview, hasBlend: true },
  { code: '4/8', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón/Marrón claro oscuro', swatchImage: hairColorUrls['4/8'].swatch, previewImage: hairColorUrls['4/8'].preview, hasBlend: true },
  { code: '4/27', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón/Rubio miel', swatchImage: hairColorUrls['4/27'].swatch, previewImage: hairColorUrls['4/27'].preview, hasBlend: true },
  { code: '6/24', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón medio/Rubio blanco', swatchImage: hairColorUrls['6/24'].swatch, previewImage: hairColorUrls['6/24'].preview, hasBlend: true },
  { code: '7/20', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón claro/Rubio platino', swatchImage: hairColorUrls['7/20'].swatch, previewImage: hairColorUrls['7/20'].preview, hasBlend: true },
  { code: '8/10', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón claro oscuro/Marrón claro', swatchImage: hairColorUrls['8/10'].swatch, previewImage: hairColorUrls['8/10'].preview, hasBlend: true },
  { code: '8/22', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón claro oscuro/Rubio muy pálido', swatchImage: hairColorUrls['8/22'].swatch, previewImage: hairColorUrls['8/22'].preview, hasBlend: true },
  { code: '9/613', family: 'Remy Hair', type: 'remy', nameEs: 'Rubio oscuro/Rubio platino blanco', swatchImage: hairColorUrls['9/613'].swatch, previewImage: hairColorUrls['9/613'].preview, hasBlend: true },
  { code: '613/24', family: 'Remy Hair', type: 'remy', nameEs: 'Rubio platino blanco/Rubio blanco', swatchImage: hairColorUrls['613/24'].swatch, previewImage: hairColorUrls['613/24'].preview, hasBlend: true },
  { code: '18/613', family: 'Remy Hair', type: 'remy', nameEs: 'Rubio ceniza/Rubio platino blanco', swatchImage: hairColorUrls['18/613'].swatch, previewImage: hairColorUrls['18/613'].preview, hasBlend: true },
  { code: '18A/613A', family: 'Remy Hair', type: 'remy', nameEs: 'Rubio ceniza/Rubio platino blanco ceniza', swatchImage: hairColorUrls['18A/613A'].swatch, previewImage: hairColorUrls['18A/613A'].preview, hasBlend: true },
  { code: 'DXB', family: 'Remy Hair', type: 'remy', nameEs: 'Mezcla oscura', swatchImage: hairColorUrls['DXB'].swatch, previewImage: hairColorUrls['DXB'].preview, hasBlend: true },
  { code: 'DXB/18', family: 'Remy Hair', type: 'remy', nameEs: 'Mezcla oscura/Rubio ceniza', swatchImage: hairColorUrls['DXB/18'].swatch, previewImage: hairColorUrls['DXB/18'].preview, hasBlend: true },

  // Rooted Hair
  { code: 'R1B-4', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz negro natural/Marrón', swatchImage: hairColorUrls['R1B-4'].swatch, previewImage: hairColorUrls['R1B-4'].preview, hasRoots: true },
  { code: 'R2-6/27', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón muy oscuro/Marrón medio/Rubio miel', swatchImage: hairColorUrls['R2-6/27'].swatch, previewImage: hairColorUrls['R2-6/27'].preview, hasRoots: true, hasBlend: true },
  { code: 'R2-4/6', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón muy oscuro/Marrón/Marrón medio', swatchImage: hairColorUrls['R2-4/6'].swatch, previewImage: hairColorUrls['R2-4/6'].preview, hasRoots: true, hasBlend: true },
  { code: 'R2-DXB/18', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón muy oscuro/Mezcla oscura/Rubio ceniza', swatchImage: hairColorUrls['R2-DXB/18'].swatch, previewImage: hairColorUrls['R2-DXB/18'].preview, hasRoots: true, hasBlend: true },
  { code: 'R2-6/24', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón muy oscuro/Marrón medio/Rubio blanco', swatchImage: hairColorUrls['R2-6/24'].swatch, previewImage: hairColorUrls['R2-6/24'].preview, hasRoots: true, hasBlend: true },
  { code: 'R2-8/10', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón muy oscuro/Marrón claro oscuro/Marrón claro', swatchImage: hairColorUrls['R2-8/10'].swatch, previewImage: hairColorUrls['R2-8/10'].preview, hasRoots: true, hasBlend: true },
  { code: 'R2-60A', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón muy oscuro/Rubio platino muy claro', swatchImage: hairColorUrls['R2-60A'].swatch, previewImage: hairColorUrls['R2-60A'].preview, hasRoots: true, hasBlend: true },
  { code: 'Rooted Silver Ash', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz/Ceniza plateada', swatchImage: hairColorUrls['Rooted Silver Ash'].swatch, previewImage: hairColorUrls['Rooted Silver Ash'].preview, hasRoots: true },
  { code: 'R5-7/20', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón claro/Marrón claro/Rubio platino', swatchImage: hairColorUrls['R5-7/20'].swatch, previewImage: hairColorUrls['R5-7/20'].preview, hasRoots: true, hasBlend: true },
  { code: 'R5-8/22', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón claro/Marrón claro oscuro/Rubio muy pálido', swatchImage: hairColorUrls['R5-8/22'].swatch, previewImage: hairColorUrls['R5-8/22'].preview, hasRoots: true, hasBlend: true },
  { code: 'R5-9/613', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón claro/Rubio oscuro/Rubio platino blanco', swatchImage: hairColorUrls['R5-9/613'].swatch, previewImage: hairColorUrls['R5-9/613'].preview, hasRoots: true, hasBlend: true },
  { code: 'R5-18A/613A', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón claro/Rubio ceniza/Rubio platino blanco ceniza', swatchImage: hairColorUrls['R5-18A/613A'].swatch, previewImage: hairColorUrls['R5-18A/613A'].preview, hasRoots: true, hasBlend: true },
  { code: 'R8-18/22', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón claro oscuro/Rubio ceniza/Rubio muy pálido', swatchImage: hairColorUrls['R8-18/22'].swatch, previewImage: hairColorUrls['R8-18/22'].preview, hasRoots: true, hasBlend: true },
  { code: 'R8-18/613', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón claro oscuro/Rubio ceniza/Rubio platino blanco', swatchImage: hairColorUrls['R8-18/613'].swatch, previewImage: hairColorUrls['R8-18/613'].preview, hasRoots: true, hasBlend: true },
];

interface HairColorSelectorProps {
  onSelect?: (code: string) => void;
  selectedCode?: string;
  compact?: boolean;
}

export default function HairColorSelector({ onSelect, selectedCode, compact = false }: HairColorSelectorProps) {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<HairColor | null>(null);

  const families = Array.from(new Set(hairColors.map(c => c.family)));
  const types = Array.from(new Set(hairColors.map(c => c.type)));

  const filteredColors = hairColors.filter(c => {
    if (selectedFamily && c.family !== selectedFamily) return false;
    if (selectedType && c.type !== selectedType) return false;
    return true;
  });

  const typeLabels: Record<string, string> = {
    virgin: 'Virgin Hair',
    remy: 'Remy Hair',
    rooted: 'Rooted & Mezclas',
    ombre: 'Ombre',
    piano: 'Piano/Highlight',
    balayage: 'Balayage',
    creative: 'Tonos creativos',
  };

  const handleSelectColor = (color: HairColor) => {
    setSelectedColor(color);
    if (onSelect) onSelect(color.code);
  };

  const currentSelected = selectedColor || filteredColors.find(c => c.code === selectedCode);

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="space-y-4 mb-8">
        {/* Family Filter */}
        <div>
          <label className="font-paragraph text-sm text-secondary/70 block mb-3 uppercase tracking-wide">
            Familia de color
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFamily(null)}
              className={`px-4 py-2 font-paragraph text-sm transition-all border ${
                selectedFamily === null
                  ? 'bg-secondary text-white border-secondary'
                  : 'bg-white text-secondary border-secondary/20 hover:border-secondary/50'
              }`}
            >
              Todos
            </button>
            {families.map(family => (
              <button
                key={family}
                onClick={() => setSelectedFamily(family)}
                className={`px-4 py-2 font-paragraph text-sm transition-all border ${
                  selectedFamily === family
                    ? 'bg-secondary text-white border-secondary'
                    : 'bg-white text-secondary border-secondary/20 hover:border-secondary/50'
                }`}
              >
                {family}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <label className="font-paragraph text-sm text-secondary/70 block mb-3 uppercase tracking-wide">
            Tipo
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-4 py-2 font-paragraph text-sm transition-all border ${
                selectedType === null
                  ? 'bg-secondary text-white border-secondary'
                  : 'bg-white text-secondary border-secondary/20 hover:border-secondary/50'
              }`}
            >
              Todos
            </button>
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 font-paragraph text-sm transition-all border ${
                  selectedType === type
                    ? 'bg-secondary text-white border-secondary'
                    : 'bg-white text-secondary border-secondary/20 hover:border-secondary/50'
                }`}
              >
                {typeLabels[type]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Preview - Large Circle at Top */}
      {currentSelected && (
        <div className="mb-12 p-8 border border-secondary/20 bg-secondary/2">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Large Hair Circle Preview */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                {/* Double Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-secondary"></div>
                <div className="absolute inset-2 rounded-full border-2 border-secondary/30"></div>
                
                {/* Hair Image */}
                <div className="absolute inset-4 rounded-full overflow-hidden">
                  <Image
                    src={currentSelected.previewImage}
                    alt={currentSelected.code}
                    className="w-full h-full object-cover"
                    width={160}
                  />
                </div>
              </div>
            </div>

            {/* Text Info */}
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="font-heading text-3xl md:text-4xl text-secondary mb-2">
                  {currentSelected.code}
                </h3>
                <p className="font-paragraph text-lg text-secondary/70">
                  {currentSelected.nameEs}
                </p>
              </div>
              <div className="space-y-2 text-sm font-paragraph text-secondary/60">
                <p><span className="font-semibold">Familia:</span> {currentSelected.family}</p>
                <p><span className="font-semibold">Tipo:</span> {typeLabels[currentSelected.type]}</p>
                {currentSelected.hasRoots && (
                  <p className="text-secondary/70"><span className="font-semibold">✓</span> Con raíz visible</p>
                )}
                {currentSelected.hasBlend && (
                  <p className="text-secondary/70"><span className="font-semibold">✓</span> Mezcla de tonos</p>
                )}
              </div>
            </div>

            {/* Close Button */}
            {selectedColor && (
              <button
                onClick={() => setSelectedColor(null)}
                className="p-2 hover:bg-secondary/10 transition-colors"
              >
                <X size={24} className="text-secondary" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Color Grid - Circular Swatches */}
      <div className="mb-8">
        <p className="font-paragraph text-sm text-secondary/60 mb-6">
          {filteredColors.length} tonos disponibles
        </p>
        <div className={`grid gap-6 md:gap-8 ${compact ? 'grid-cols-5 md:grid-cols-7 lg:grid-cols-7' : 'grid-cols-5 md:grid-cols-7 lg:grid-cols-7'}`}>
          {filteredColors.map(color => (
            <button
              key={color.code}
              onClick={() => handleSelectColor(color)}
              className="flex flex-col items-center gap-2 transition-all group"
              title={color.nameEs}
            >
              {/* Circular Swatch - 40-44px */}
              <div className="relative">
                <div
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 transition-all ${
                    selectedColor?.code === color.code || selectedCode === color.code
                      ? 'border-secondary ring-4 ring-secondary ring-offset-2'
                      : 'border-secondary/30 group-hover:border-secondary/70'
                  }`}
                >
                  <Image
                    src={color.swatchImage}
                    alt={color.code}
                    className="w-full h-full object-cover"
                    width={44}
                  />
                </div>
                
                {/* Indicators for special types */}
                {(color.hasRoots || color.hasBlend) && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-secondary rounded-full border border-white"></div>
                )}
              </div>

              {/* Code Label */}
              <span className={`font-paragraph text-xs font-semibold text-center leading-tight break-words max-w-[3rem] ${
                selectedColor?.code === color.code || selectedCode === color.code
                  ? 'text-secondary'
                  : 'text-secondary/70 group-hover:text-secondary'
              }`}>
                {color.code}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredColors.length === 0 && (
        <div className="py-12 text-center">
          <p className="font-paragraph text-secondary/60">
            No hay tonos disponibles con los filtros seleccionados.
          </p>
        </div>
      )}
    </div>
  );
}
