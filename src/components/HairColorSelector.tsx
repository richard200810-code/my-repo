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

// Helper function to generate swatch image URL from color code
function getSwatchImageUrl(code: string): string {
  // Convert code to lowercase and replace / with -
  const normalizedCode = code.toLowerCase().replace(/\//g, '-');
  return `https://static.wixstatic.com/media/37e681_swatch-${normalizedCode}.jpg`;
}

const hairColors: HairColor[] = [
  // Virgin Hair - Básicos
  { code: '1', family: 'Virgin Hair', type: 'virgin', nameEs: 'Negro profundo', swatchImage: getSwatchImageUrl('1'), previewImage: getSwatchImageUrl('1') },
  { code: '1B', family: 'Virgin Hair', type: 'virgin', nameEs: 'Negro natural', swatchImage: getSwatchImageUrl('1B'), previewImage: getSwatchImageUrl('1B') },
  { code: '2', family: 'Virgin Hair', type: 'virgin', nameEs: 'Marrón muy oscuro', swatchImage: getSwatchImageUrl('2'), previewImage: getSwatchImageUrl('2') },
  { code: '3A', family: 'Virgin Hair', type: 'virgin', nameEs: 'Marrón oscuro', swatchImage: getSwatchImageUrl('3A'), previewImage: getSwatchImageUrl('3A') },
  { code: '4', family: 'Virgin Hair', type: 'virgin', nameEs: 'Marrón', swatchImage: getSwatchImageUrl('4'), previewImage: getSwatchImageUrl('4') },
  { code: '5', family: 'Virgin Hair', type: 'virgin', nameEs: 'Marrón claro', swatchImage: getSwatchImageUrl('5'), previewImage: getSwatchImageUrl('5') },
  { code: '6', family: 'Virgin Hair', type: 'virgin', nameEs: 'Marrón medio', swatchImage: getSwatchImageUrl('6'), previewImage: getSwatchImageUrl('6') },
  { code: '8', family: 'Virgin Hair', type: 'virgin', nameEs: 'Marrón claro oscuro', swatchImage: getSwatchImageUrl('8'), previewImage: getSwatchImageUrl('8') },
  { code: '12', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio medio', swatchImage: getSwatchImageUrl('12'), previewImage: getSwatchImageUrl('12') },
  { code: '14', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio claro', swatchImage: getSwatchImageUrl('14'), previewImage: getSwatchImageUrl('14') },
  { code: '16', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio muy claro', swatchImage: getSwatchImageUrl('16'), previewImage: getSwatchImageUrl('16') },
  { code: '18', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio ceniza', swatchImage: getSwatchImageUrl('18'), previewImage: getSwatchImageUrl('18') },
  { code: '20', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio platino', swatchImage: getSwatchImageUrl('20'), previewImage: getSwatchImageUrl('20') },
  { code: '22', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio muy pálido', swatchImage: getSwatchImageUrl('22'), previewImage: getSwatchImageUrl('22') },
  { code: '24', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio blanco', swatchImage: getSwatchImageUrl('24'), previewImage: getSwatchImageUrl('24') },
  { code: '27', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio miel', swatchImage: getSwatchImageUrl('27'), previewImage: getSwatchImageUrl('27') },
  { code: '30', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio muy claro', swatchImage: getSwatchImageUrl('30'), previewImage: getSwatchImageUrl('30') },
  { code: '33', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio dorado', swatchImage: getSwatchImageUrl('33'), previewImage: getSwatchImageUrl('33') },
  { code: '60', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio platino claro', swatchImage: getSwatchImageUrl('60'), previewImage: getSwatchImageUrl('60') },
  { code: '60A', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio platino muy claro', swatchImage: getSwatchImageUrl('60A'), previewImage: getSwatchImageUrl('60A') },
  { code: '#613', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rubio platino blanco', swatchImage: getSwatchImageUrl('613'), previewImage: getSwatchImageUrl('613') },
  { code: '#99J', family: 'Virgin Hair', type: 'virgin', nameEs: 'Rojo vino', swatchImage: getSwatchImageUrl('99j'), previewImage: getSwatchImageUrl('99j') },

  // Remy Hair - Mezclas
  { code: '2/4', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón muy oscuro/Marrón', swatchImage: getSwatchImageUrl('2/4'), previewImage: getSwatchImageUrl('2/4'), hasBlend: true },
  { code: '2/5', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón muy oscuro/Marrón claro', swatchImage: getSwatchImageUrl('2/5'), previewImage: getSwatchImageUrl('2/5'), hasBlend: true },
  { code: '1B/2', family: 'Remy Hair', type: 'remy', nameEs: 'Negro natural/Marrón muy oscuro', swatchImage: getSwatchImageUrl('1B/2'), previewImage: getSwatchImageUrl('1B/2'), hasBlend: true },
  { code: '1B/4', family: 'Remy Hair', type: 'remy', nameEs: 'Negro natural/Marrón', swatchImage: getSwatchImageUrl('1B/4'), previewImage: getSwatchImageUrl('1B/4'), hasBlend: true },
  { code: '4/6', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón/Marrón medio', swatchImage: getSwatchImageUrl('4/6'), previewImage: getSwatchImageUrl('4/6'), hasBlend: true },
  { code: '4/8', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón/Marrón claro oscuro', swatchImage: getSwatchImageUrl('4/8'), previewImage: getSwatchImageUrl('4/8'), hasBlend: true },
  { code: '4/27', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón/Rubio miel', swatchImage: getSwatchImageUrl('4/27'), previewImage: getSwatchImageUrl('4/27'), hasBlend: true },
  { code: '6/24', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón medio/Rubio blanco', swatchImage: getSwatchImageUrl('6/24'), previewImage: getSwatchImageUrl('6/24'), hasBlend: true },
  { code: '7/20', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón claro/Rubio platino', swatchImage: getSwatchImageUrl('7/20'), previewImage: getSwatchImageUrl('7/20'), hasBlend: true },
  { code: '8/10', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón claro oscuro/Marrón claro', swatchImage: getSwatchImageUrl('8/10'), previewImage: getSwatchImageUrl('8/10'), hasBlend: true },
  { code: '8/22', family: 'Remy Hair', type: 'remy', nameEs: 'Marrón claro oscuro/Rubio muy pálido', swatchImage: getSwatchImageUrl('8/22'), previewImage: getSwatchImageUrl('8/22'), hasBlend: true },
  { code: '9/613', family: 'Remy Hair', type: 'remy', nameEs: 'Rubio oscuro/Rubio platino blanco', swatchImage: getSwatchImageUrl('9/613'), previewImage: getSwatchImageUrl('9/613'), hasBlend: true },
  { code: '613/24', family: 'Remy Hair', type: 'remy', nameEs: 'Rubio platino blanco/Rubio blanco', swatchImage: getSwatchImageUrl('613/24'), previewImage: getSwatchImageUrl('613/24'), hasBlend: true },
  { code: '18/613', family: 'Remy Hair', type: 'remy', nameEs: 'Rubio ceniza/Rubio platino blanco', swatchImage: getSwatchImageUrl('18/613'), previewImage: getSwatchImageUrl('18/613'), hasBlend: true },
  { code: '18A/613A', family: 'Remy Hair', type: 'remy', nameEs: 'Rubio ceniza/Rubio platino blanco ceniza', swatchImage: getSwatchImageUrl('18A/613A'), previewImage: getSwatchImageUrl('18A/613A'), hasBlend: true },
  { code: 'DXB', family: 'Remy Hair', type: 'remy', nameEs: 'Mezcla oscura', swatchImage: getSwatchImageUrl('DXB'), previewImage: getSwatchImageUrl('DXB'), hasBlend: true },
  { code: 'DXB/18', family: 'Remy Hair', type: 'remy', nameEs: 'Mezcla oscura/Rubio ceniza', swatchImage: getSwatchImageUrl('DXB/18'), previewImage: getSwatchImageUrl('DXB/18'), hasBlend: true },

  // Rooted Hair
  { code: 'R1B-4', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz negro natural/Marrón', swatchImage: getSwatchImageUrl('R1B-4'), previewImage: getSwatchImageUrl('R1B-4'), hasRoots: true },
  { code: 'R2-6/27', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón muy oscuro/Marrón medio/Rubio miel', swatchImage: getSwatchImageUrl('R2-6/27'), previewImage: getSwatchImageUrl('R2-6/27'), hasRoots: true, hasBlend: true },
  { code: 'R2-4/6', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón muy oscuro/Marrón/Marrón medio', swatchImage: getSwatchImageUrl('R2-4/6'), previewImage: getSwatchImageUrl('R2-4/6'), hasRoots: true, hasBlend: true },
  { code: 'R2-DXB/18', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón muy oscuro/Mezcla oscura/Rubio ceniza', swatchImage: getSwatchImageUrl('R2-DXB/18'), previewImage: getSwatchImageUrl('R2-DXB/18'), hasRoots: true, hasBlend: true },
  { code: 'R2-6/24', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón muy oscuro/Marrón medio/Rubio blanco', swatchImage: getSwatchImageUrl('R2-6/24'), previewImage: getSwatchImageUrl('R2-6/24'), hasRoots: true, hasBlend: true },
  { code: 'R2-8/10', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón muy oscuro/Marrón claro oscuro/Marrón claro', swatchImage: getSwatchImageUrl('R2-8/10'), previewImage: getSwatchImageUrl('R2-8/10'), hasRoots: true, hasBlend: true },
  { code: 'R2-60A', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón muy oscuro/Rubio platino muy claro', swatchImage: getSwatchImageUrl('R2-60A'), previewImage: getSwatchImageUrl('R2-60A'), hasRoots: true, hasBlend: true },
  { code: 'Rooted Silver Ash', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz/Ceniza plateada', swatchImage: getSwatchImageUrl('rooted-silver-ash'), previewImage: getSwatchImageUrl('rooted-silver-ash'), hasRoots: true },
  { code: 'R5-7/20', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón claro/Marrón claro/Rubio platino', swatchImage: getSwatchImageUrl('R5-7/20'), previewImage: getSwatchImageUrl('R5-7/20'), hasRoots: true, hasBlend: true },
  { code: 'R5-8/22', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón claro/Marrón claro oscuro/Rubio muy pálido', swatchImage: getSwatchImageUrl('R5-8/22'), previewImage: getSwatchImageUrl('R5-8/22'), hasRoots: true, hasBlend: true },
  { code: 'R5-9/613', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón claro/Rubio oscuro/Rubio platino blanco', swatchImage: getSwatchImageUrl('R5-9/613'), previewImage: getSwatchImageUrl('R5-9/613'), hasRoots: true, hasBlend: true },
  { code: 'R5-18A/613A', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón claro/Rubio ceniza/Rubio platino blanco ceniza', swatchImage: getSwatchImageUrl('R5-18A/613A'), previewImage: getSwatchImageUrl('R5-18A/613A'), hasRoots: true, hasBlend: true },
  { code: 'R8-18/22', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón claro oscuro/Rubio ceniza/Rubio muy pálido', swatchImage: getSwatchImageUrl('R8-18/22'), previewImage: getSwatchImageUrl('R8-18/22'), hasRoots: true, hasBlend: true },
  { code: 'R8-18/613', family: 'Rooted & Mezclas', type: 'rooted', nameEs: 'Raíz marrón claro oscuro/Rubio ceniza/Rubio platino blanco', swatchImage: getSwatchImageUrl('R8-18/613'), previewImage: getSwatchImageUrl('R8-18/613'), hasRoots: true, hasBlend: true },
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
