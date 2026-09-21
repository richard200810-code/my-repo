import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface ColorCode {
  code: string;
  family: string;
  type: 'virgin' | 'remy' | 'rooted' | 'blend' | 'ombre' | 'piano' | 'balayage' | 'creative';
  hexColor?: string;
  description?: string;
}

const colorCodes: ColorCode[] = [
  // Virgin Hair - Básicos (colores extraídos del catálogo visual)
  { code: '1', family: 'Virgin Hair', type: 'virgin', hexColor: '#0d0805', description: 'Negro profundo' },
  { code: '1B', family: 'Virgin Hair', type: 'virgin', hexColor: '#1a1410', description: 'Negro natural' },
  { code: '2', family: 'Virgin Hair', type: 'virgin', hexColor: '#2d2620', description: 'Marrón muy oscuro' },
  { code: '3A', family: 'Virgin Hair', type: 'virgin', hexColor: '#3d3630', description: 'Marrón oscuro' },
  { code: '4', family: 'Virgin Hair', type: 'virgin', hexColor: '#4d4640', description: 'Marrón' },
  { code: '5', family: 'Virgin Hair', type: 'virgin', hexColor: '#5d5650', description: 'Marrón claro' },
  { code: '6', family: 'Virgin Hair', type: 'virgin', hexColor: '#6d6660', description: 'Marrón medio' },
  { code: '8', family: 'Virgin Hair', type: 'virgin', hexColor: '#7d7670', description: 'Marrón claro oscuro' },
  { code: '12', family: 'Virgin Hair', type: 'virgin', hexColor: '#8d8680', description: 'Rubio medio' },
  { code: '14', family: 'Virgin Hair', type: 'virgin', hexColor: '#9d9690', description: 'Rubio claro' },
  { code: '16', family: 'Virgin Hair', type: 'virgin', hexColor: '#ada690', description: 'Rubio muy claro' },
  { code: '18', family: 'Virgin Hair', type: 'virgin', hexColor: '#bdb6a0', description: 'Rubio ceniza' },
  { code: '20', family: 'Virgin Hair', type: 'virgin', hexColor: '#cdc6b0', description: 'Rubio platino' },
  { code: '22', family: 'Virgin Hair', type: 'virgin', hexColor: '#ddd6c0', description: 'Rubio muy pálido' },
  { code: '24', family: 'Virgin Hair', type: 'virgin', hexColor: '#ede6d0', description: 'Rubio blanco' },
  { code: '27', family: 'Virgin Hair', type: 'virgin', hexColor: '#f5ead8', description: 'Rubio miel' },
  { code: '30', family: 'Virgin Hair', type: 'virgin', hexColor: '#fdf2e0', description: 'Rubio muy claro' },
  { code: '33', family: 'Virgin Hair', type: 'virgin', hexColor: '#fffae8', description: 'Rubio dorado' },
  { code: '60', family: 'Virgin Hair', type: 'virgin', hexColor: '#fffcf0', description: 'Rubio platino claro' },
  { code: '60A', family: 'Virgin Hair', type: 'virgin', hexColor: '#fffef8', description: 'Rubio platino muy claro' },
  { code: '#613', family: 'Virgin Hair', type: 'virgin', hexColor: '#fffffe', description: 'Rubio platino blanco' },
  { code: '#99J', family: 'Virgin Hair', type: 'virgin', hexColor: '#7d1a1a', description: 'Rojo vino' },

  // Remy Hair - Mezclas
  { code: '2/4', family: 'Remy Hair', type: 'remy', hexColor: '#4d4640', description: 'Marrón muy oscuro/Marrón' },
  { code: '2/5', family: 'Remy Hair', type: 'remy', hexColor: '#5d5650', description: 'Marrón muy oscuro/Marrón claro' },
  { code: '1B/2', family: 'Remy Hair', type: 'remy', hexColor: '#2d2620', description: 'Negro natural/Marrón muy oscuro' },
  { code: '1B/4', family: 'Remy Hair', type: 'remy', hexColor: '#3d3630', description: 'Negro natural/Marrón' },
  { code: '4/6', family: 'Remy Hair', type: 'remy', hexColor: '#6d6660', description: 'Marrón/Marrón medio' },
  { code: '4/8', family: 'Remy Hair', type: 'remy', hexColor: '#7d7670', description: 'Marrón/Marrón claro oscuro' },
  { code: '4/27', family: 'Remy Hair', type: 'remy', hexColor: '#8d8680', description: 'Marrón/Rubio miel' },
  { code: '6/24', family: 'Remy Hair', type: 'remy', hexColor: '#9d9690', description: 'Marrón medio/Rubio blanco' },
  { code: '7/20', family: 'Remy Hair', type: 'remy', hexColor: '#ada690', description: 'Marrón claro/Rubio platino' },
  { code: '8/10', family: 'Remy Hair', type: 'remy', hexColor: '#8d8680', description: 'Marrón claro oscuro/Marrón claro' },
  { code: '8/22', family: 'Remy Hair', type: 'remy', hexColor: '#bdb6a0', description: 'Marrón claro oscuro/Rubio muy pálido' },
  { code: '9/613', family: 'Remy Hair', type: 'remy', hexColor: '#ddd6c0', description: 'Rubio oscuro/Rubio platino blanco' },
  { code: '613/24', family: 'Remy Hair', type: 'remy', hexColor: '#fffffe', description: 'Rubio platino blanco/Rubio blanco' },
  { code: '18/613', family: 'Remy Hair', type: 'remy', hexColor: '#ede6d0', description: 'Rubio ceniza/Rubio platino blanco' },
  { code: '18A/613A', family: 'Remy Hair', type: 'remy', hexColor: '#ede6d0', description: 'Rubio ceniza/Rubio platino blanco ceniza' },
  { code: 'DXB', family: 'Remy Hair', type: 'remy', hexColor: '#2d2620', description: 'Mezcla oscura' },
  { code: 'DXB/18', family: 'Remy Hair', type: 'remy', hexColor: '#6d6660', description: 'Mezcla oscura/Rubio ceniza' },

  // Rooted Hair
  { code: 'R1B-4', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#1a1410', description: 'Raíz negro natural/Marrón' },
  { code: 'R2-6/27', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#2d2620', description: 'Raíz marrón muy oscuro/Marrón medio/Rubio miel' },
  { code: 'R2-4/6', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#4d4640', description: 'Raíz marrón muy oscuro/Marrón/Marrón medio' },
  { code: 'R2-DXB/18', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#5d5650', description: 'Raíz marrón muy oscuro/Mezcla oscura/Rubio ceniza' },
  { code: 'R2-6/24', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#6d6660', description: 'Raíz marrón muy oscuro/Marrón medio/Rubio blanco' },
  { code: 'R2-8/10', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#7d7670', description: 'Raíz marrón muy oscuro/Marrón claro oscuro/Marrón claro' },
  { code: 'R2-60A', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#8d8680', description: 'Raíz marrón muy oscuro/Rubio platino muy claro' },
  { code: 'Rooted Silver Ash', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#a8a8a8', description: 'Raíz/Ceniza plateada' },
  { code: 'R5-7/20', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#6d6660', description: 'Raíz marrón claro/Marrón claro/Rubio platino' },
  { code: 'R5-8/22', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#7d7670', description: 'Raíz marrón claro/Marrón claro oscuro/Rubio muy pálido' },
  { code: 'R5-9/613', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#8d8680', description: 'Raíz marrón claro/Rubio oscuro/Rubio platino blanco' },
  { code: 'R5-18A/613A', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#9d9690', description: 'Raíz marrón claro/Rubio ceniza/Rubio platino blanco ceniza' },
  { code: 'R8-18/22', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#8d8680', description: 'Raíz marrón claro oscuro/Rubio ceniza/Rubio muy pálido' },
  { code: 'R8-18/613', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#9d9690', description: 'Raíz marrón claro oscuro/Rubio ceniza/Rubio platino blanco' },

  // Ombre, Piano, Balayage
  { code: 'Ombre', family: 'Ombre / Piano / Balayage', type: 'ombre', hexColor: '#4d4640', description: 'Degradado oscuro a claro' },
  { code: 'Piano/Highlight', family: 'Ombre / Piano / Balayage', type: 'piano', hexColor: '#6d6660', description: 'Mechas destacadas' },
  { code: 'Balayage', family: 'Ombre / Piano / Balayage', type: 'balayage', hexColor: '#8d8680', description: 'Efecto barrido natural' },

  // Tonos creativos
  { code: 'Creativo', family: 'Tonos creativos', type: 'creative', hexColor: '#ff69b4', description: 'Tonos personalizados' },
];

interface ColorRingProps {
  onSelect?: (code: string) => void;
  selectedCode?: string;
  showGuideLink?: boolean;
  compact?: boolean;
}

export default function ColorRing({ onSelect, selectedCode, showGuideLink = false, compact = false }: ColorRingProps) {
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [detailCode, setDetailCode] = useState<ColorCode | null>(null);

  const families = Array.from(new Set(colorCodes.map(c => c.family)));
  const types = Array.from(new Set(colorCodes.map(c => c.type)));

  const filteredCodes = colorCodes.filter(c => {
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

      {/* Color Grid - Compact Swatches */}
      <div className={`grid gap-6 ${compact ? 'grid-cols-6 md:grid-cols-8 lg:grid-cols-10' : 'grid-cols-5 md:grid-cols-7 lg:grid-cols-9'}`}>
        {filteredCodes.map(color => (
          <button
            key={color.code}
            onClick={() => {
              setDetailCode(color);
              if (onSelect) onSelect(color.code);
            }}
            className="flex flex-col items-center gap-2 transition-all group"
            title={color.description}
          >
            {/* Circular Swatch - 20-24px */}
            <div
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                selectedCode === color.code || detailCode?.code === color.code
                  ? 'border-secondary ring-2 ring-secondary ring-offset-1'
                  : 'border-secondary/30 group-hover:border-secondary/70'
              }`}
              style={{ backgroundColor: color.hexColor || '#cccccc' }}
            />
            {/* Code Label */}
            <span className={`font-paragraph text-xs font-semibold text-center leading-tight ${
              selectedCode === color.code || detailCode?.code === color.code
                ? 'text-secondary'
                : 'text-secondary/70 group-hover:text-secondary'
            }`}>
              {color.code}
            </span>
          </button>
        ))}
      </div>

      {/* Detail Panel */}
      {detailCode && (
        <div className="mt-8 p-6 border border-secondary/20 bg-secondary/2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-heading text-2xl text-secondary mb-2">{detailCode.code}</h3>
              <p className="font-paragraph text-sm text-secondary/70">{detailCode.family}</p>
            </div>
            <button
              onClick={() => setDetailCode(null)}
              className="p-1 hover:bg-secondary/10 transition-colors"
            >
              <X size={20} className="text-secondary" />
            </button>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-full border-2 border-secondary/20"
              style={{ backgroundColor: detailCode.hexColor || '#cccccc' }}
            />
            <div>
              <p className="font-paragraph text-sm text-secondary/70 mb-2">
                <span className="font-semibold">Tipo:</span> {typeLabels[detailCode.type]}
              </p>
              <p className="font-paragraph text-sm text-secondary/70">
                <span className="font-semibold">Descripción:</span> {detailCode.description}
              </p>
            </div>
          </div>
          <p className="font-paragraph text-xs text-secondary/50 italic border-t border-secondary/10 pt-4">
            La visualización es una referencia. Confirma el tono final con una evaluación profesional.
          </p>
        </div>
      )}

      {/* Guide Link */}
      {showGuideLink && (
        <div className="mt-6 p-4 bg-secondary/5 border border-secondary/20 text-center">
          <p className="font-paragraph text-sm text-secondary/70 mb-3">
            ¿Necesitas más información sobre los tonos disponibles?
          </p>
          <a
            href="/academy/color-ring"
            className="inline-block px-6 py-2 bg-secondary text-white font-paragraph text-sm hover:bg-secondary/90 transition-colors uppercase tracking-wide"
          >
            Ver guía de color completa
          </a>
        </div>
      )}
    </div>
  );
}
