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
  // Virgin Hair - Básicos
  { code: '1', family: 'Virgin Hair', type: 'virgin', hexColor: '#1a1410', description: 'Negro profundo' },
  { code: '1B', family: 'Virgin Hair', type: 'virgin', hexColor: '#2a2420', description: 'Negro natural' },
  { code: '2', family: 'Virgin Hair', type: 'virgin', hexColor: '#3a3430', description: 'Marrón muy oscuro' },
  { code: '3A', family: 'Virgin Hair', type: 'virgin', hexColor: '#4a4440', description: 'Marrón oscuro' },
  { code: '4', family: 'Virgin Hair', type: 'virgin', hexColor: '#5a5450', description: 'Marrón' },
  { code: '5', family: 'Virgin Hair', type: 'virgin', hexColor: '#6a6460', description: 'Marrón claro' },
  { code: '6', family: 'Virgin Hair', type: 'virgin', hexColor: '#7a7470', description: 'Marrón medio' },
  { code: '8', family: 'Virgin Hair', type: 'virgin', hexColor: '#8a8480', description: 'Marrón claro oscuro' },
  { code: '12', family: 'Virgin Hair', type: 'virgin', hexColor: '#9a9490', description: 'Rubio medio' },
  { code: '14', family: 'Virgin Hair', type: 'virgin', hexColor: '#aaa490', description: 'Rubio claro' },
  { code: '16', family: 'Virgin Hair', type: 'virgin', hexColor: '#bab4a0', description: 'Rubio muy claro' },
  { code: '18', family: 'Virgin Hair', type: 'virgin', hexColor: '#cac4b0', description: 'Rubio ceniza' },
  { code: '20', family: 'Virgin Hair', type: 'virgin', hexColor: '#dac4b0', description: 'Rubio platino' },
  { code: '22', family: 'Virgin Hair', type: 'virgin', hexColor: '#e0d4c0', description: 'Rubio muy pálido' },
  { code: '24', family: 'Virgin Hair', type: 'virgin', hexColor: '#e8dcc8', description: 'Rubio blanco' },
  { code: '27', family: 'Virgin Hair', type: 'virgin', hexColor: '#f0e4d0', description: 'Rubio miel' },
  { code: '30', family: 'Virgin Hair', type: 'virgin', hexColor: '#f8ecd8', description: 'Rubio muy claro' },
  { code: '33', family: 'Virgin Hair', type: 'virgin', hexColor: '#faf4e0', description: 'Rubio dorado' },
  { code: '60', family: 'Virgin Hair', type: 'virgin', hexColor: '#fcf8e8', description: 'Rubio platino claro' },
  { code: '60A', family: 'Virgin Hair', type: 'virgin', hexColor: '#fdfcf0', description: 'Rubio platino muy claro' },
  { code: '613', family: 'Virgin Hair', type: 'virgin', hexColor: '#fffef8', description: 'Rubio platino blanco' },
  { code: '99J', family: 'Virgin Hair', type: 'virgin', hexColor: '#8b0000', description: 'Rojo vino' },

  // Remy Hair - Mezclas
  { code: '2/4', family: 'Remy Hair', type: 'remy', hexColor: '#4a4440', description: 'Marrón muy oscuro/Marrón' },
  { code: '2/5', family: 'Remy Hair', type: 'remy', hexColor: '#5a5450', description: 'Marrón muy oscuro/Marrón claro' },
  { code: '1B/2', family: 'Remy Hair', type: 'remy', hexColor: '#3a3430', description: 'Negro natural/Marrón muy oscuro' },
  { code: '1B/4', family: 'Remy Hair', type: 'remy', hexColor: '#4a4440', description: 'Negro natural/Marrón' },
  { code: '4/6', family: 'Remy Hair', type: 'remy', hexColor: '#6a6460', description: 'Marrón/Marrón medio' },
  { code: '4/8', family: 'Remy Hair', type: 'remy', hexColor: '#7a7470', description: 'Marrón/Marrón claro oscuro' },
  { code: '4/27', family: 'Remy Hair', type: 'remy', hexColor: '#8a8480', description: 'Marrón/Rubio miel' },
  { code: '6/24', family: 'Remy Hair', type: 'remy', hexColor: '#9a9490', description: 'Marrón medio/Rubio blanco' },
  { code: '7/20', family: 'Remy Hair', type: 'remy', hexColor: '#aaa490', description: 'Marrón claro/Rubio platino' },
  { code: '8/10', family: 'Remy Hair', type: 'remy', hexColor: '#8a8480', description: 'Marrón claro oscuro/Marrón claro' },
  { code: '8/22', family: 'Remy Hair', type: 'remy', hexColor: '#bab4a0', description: 'Marrón claro oscuro/Rubio muy pálido' },
  { code: '9/613', family: 'Remy Hair', type: 'remy', hexColor: '#d0c4b0', description: 'Rubio oscuro/Rubio platino blanco' },
  { code: '613/24', family: 'Remy Hair', type: 'remy', hexColor: '#fffef8', description: 'Rubio platino blanco/Rubio blanco' },
  { code: '18/613', family: 'Remy Hair', type: 'remy', hexColor: '#e8dcc8', description: 'Rubio ceniza/Rubio platino blanco' },
  { code: '18A/613A', family: 'Remy Hair', type: 'remy', hexColor: '#e8dcc8', description: 'Rubio ceniza/Rubio platino blanco ceniza' },
  { code: 'DXB', family: 'Remy Hair', type: 'remy', hexColor: '#3a3430', description: 'Mezcla oscura' },
  { code: 'DXB/18', family: 'Remy Hair', type: 'remy', hexColor: '#6a6460', description: 'Mezcla oscura/Rubio ceniza' },

  // Rooted Hair
  { code: 'R1B-4', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#2a2420', description: 'Raíz negro natural/Marrón' },
  { code: 'R2-6/27', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#3a3430', description: 'Raíz marrón muy oscuro/Marrón medio/Rubio miel' },
  { code: 'R2-4/6', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#4a4440', description: 'Raíz marrón muy oscuro/Marrón/Marrón medio' },
  { code: 'R2-DXB/18', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#5a5450', description: 'Raíz marrón muy oscuro/Mezcla oscura/Rubio ceniza' },
  { code: 'R2-6/24', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#6a6460', description: 'Raíz marrón muy oscuro/Marrón medio/Rubio blanco' },
  { code: 'R2-8/10', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#7a7470', description: 'Raíz marrón muy oscuro/Marrón claro oscuro/Marrón claro' },
  { code: 'R2-60A', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#8a8480', description: 'Raíz marrón muy oscuro/Rubio platino muy claro' },
  { code: 'Rooted Silver Ash', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#a0a0a0', description: 'Raíz/Ceniza plateada' },
  { code: 'R5-7/20', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#6a6460', description: 'Raíz marrón claro/Marrón claro/Rubio platino' },
  { code: 'R5-8/22', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#7a7470', description: 'Raíz marrón claro/Marrón claro oscuro/Rubio muy pálido' },
  { code: 'R5-9/613', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#8a8480', description: 'Raíz marrón claro/Rubio oscuro/Rubio platino blanco' },
  { code: 'R5-18A/613A', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#9a9490', description: 'Raíz marrón claro/Rubio ceniza/Rubio platino blanco ceniza' },
  { code: 'R8-18/22', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#8a8480', description: 'Raíz marrón claro oscuro/Rubio ceniza/Rubio muy pálido' },
  { code: 'R8-18/613', family: 'Rooted & Mezclas', type: 'rooted', hexColor: '#9a9490', description: 'Raíz marrón claro oscuro/Rubio ceniza/Rubio platino blanco' },

  // Ombre, Piano, Balayage
  { code: 'Ombre', family: 'Ombre / Piano / Balayage', type: 'ombre', hexColor: '#4a4440', description: 'Degradado oscuro a claro' },
  { code: 'Piano/Highlight', family: 'Ombre / Piano / Balayage', type: 'piano', hexColor: '#6a6460', description: 'Mechas destacadas' },
  { code: 'Balayage', family: 'Ombre / Piano / Balayage', type: 'balayage', hexColor: '#8a8480', description: 'Efecto barrido natural' },

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

      {/* Color Grid */}
      <div className={`grid gap-4 ${compact ? 'grid-cols-4 md:grid-cols-6 lg:grid-cols-8' : 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6'}`}>
        {filteredCodes.map(color => (
          <button
            key={color.code}
            onClick={() => {
              setDetailCode(color);
              if (onSelect) onSelect(color.code);
            }}
            className={`flex flex-col items-center gap-2 p-3 border-2 transition-all ${
              selectedCode === color.code || detailCode?.code === color.code
                ? 'border-secondary bg-secondary/5'
                : 'border-secondary/20 hover:border-secondary/50'
            }`}
          >
            <div
              className="w-full aspect-square rounded-sm"
              style={{ backgroundColor: color.hexColor || '#cccccc' }}
              title={color.description}
            />
            <span className="font-paragraph text-xs text-secondary font-semibold text-center">{color.code}</span>
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
              className="w-24 h-24 rounded-sm"
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
