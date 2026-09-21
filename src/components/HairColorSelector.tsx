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
const BASE = 'https://static.wixstatic.com/media/37e681_';
const codes = ['1','1B','2','3A','4','5','6','8','12','14','16','18','20','22','24','27','30','33','60','60A','#613','#99J','2/4','2/5','1B/2','1B/4','4/6','4/8','4/27','6/24','7/20','8/10','8/22','9/613','613/24','18/613','18A/613A','DXB','DXB/18','R1B-4','R2-6/27','R2-4/6','R2-DXB/18','R2-6/24','R2-8/10','R2-60A','Rooted Silver Ash','R5-7/20','R5-8/22','R5-9/613','R5-18A/613A','R8-18/22','R8-18/613'];
const ids = ['1e0edffecb9a4e95bb3d7599c0d15577','209228a6ae26434ba678bcd7fc8d3449','df4e3c6d2a734b4785d70885f30e47ba','80f203c6ef37487f80cd21aab0c4a294','38685dcf357541a1a805da379b959f9e','b4cb94855d6a4676b5012a04d955e272','b07164ddfb6d45ee9b7fcfd15d92106f','79222f0660af4db58912d898e1bce6d9','7368440b75024c9bb218f2599f5287f3','8970bb88f4a44a0bb43d1d60da5ac0d1','20c92c6b13944161a68d7f7f80b300f1','f1d8401a82cc4cc3ab3071c980cfc181','7c4fe0536e8f456fab7268fc558b1431','078b3700c7b243a3a2d7f6c3f3623a31','017e135b72274d94b4be9d79ea24b2d1','d595cc51f089428e9e6713a1d0e2ce3d','3884945455bd496a84e7c0d2b190d98e','4cd2d8ef333f435da56b45cdba1285e6','ab63da6196b04dd5af7651cdced2e8ed','c1075881e11c43c89bbb509add061844','0eb838308b6d4cfa94feb2fc6ba59ae1','3b84cf7ee4c64dee90dc4068980e2d81','ddba1cfadcbc48aeba19c3b3da7e1440','dd47d409f7c14dcfb839cdb028a3df57','fe3b588211ba422d85ce37b6563444e8','7bb256e66ca54de1802a8cc0251109ff','3ccda312fcee454893f972382b2fb5c5','7f04a15660fe4ff992414acc554c3a12','d7fb239a791545c180ecb25213e994bc','dcafe638f3164480acbe2bb1c9c5b5a8','4852b61ab1884ab8b587ad134594071c','6393f30d5ded43a3b90874f40755a669','69b379d9f9db4f99931f567b7daf53b7','6f7f1b48720643adb8668e2bbae26214','eb5945b0639044df9976789bdafb5a8d','b1bb281fa4f5477fb648d07710fe59a8','edb520d71aa84ebd89ed0c538a27054f','c9ad2812421346c2b5c43db338b49864','9edfaff7b3b34212b2b43758d7727277','74f8540abd4647479ec49799c630e8a5','3006456f0bf945dfb57b0ee00319b089','08b563ecc854424185b4489bd41d0451','582115066c9e42e395d682c6b4d468dc','37475ab3a4c74e1c8e6dc59ae316f3a4','babcaf06bbd6420daafdc8b6e8963c7f','3cfbd01656e94133af1f483f75601179','1c90e5f9e98d42be869bf42a8ceb7090','13e046da0224410eaec251cc8b01044c','813df4d3982f497cab26b47052e73bcc','754c0443f4da4938a1f43f3a9e191d59','864ca2fcbbaf434f8d372fae0149dd30','d1d77ddca0ca4a2999283b5558283620','6b90a9434a454259995a85bc27fe93d1'];

const hairColorUrls: Record<string, { swatch: string; preview: string }> = {};
for (let i = 0; i < codes.length; i++) {
  const url = BASE + ids[i] + '~mv2.jpg';
  hairColorUrls[codes[i]] = { swatch: url, preview: url };
}

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
