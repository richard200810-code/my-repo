import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { allColors, searchColors } from '@/lib/colorData';

interface HairColor {
  code: string;
  series: 'virgin' | 'remy' | 'customized';
  seriesLabel: string;
  imageUrl?: string;
  hasImage: boolean;
}

interface HairColorSelectorProps {
  onSelect?: (code: string) => void;
  selectedCode?: string;
  compact?: boolean;
}

export default function HairColorSelector({ onSelect, selectedCode, compact = false }: HairColorSelectorProps) {
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<HairColor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredColors = allColors.filter(c => {
    if (selectedSeries && c.series !== selectedSeries) return false;
    if (searchQuery) {
      const results = searchColors(searchQuery);
      if (!results.find(r => r.code === c.code)) return false;
    }
    return true;
  });

  const seriesLabels: Record<string, string> = {
    virgin: 'Virgin Hair (63)',
    remy: 'Remy Hair (53)',
    customized: 'Customized Color Ring (49)',
  };

  const handleSelectColor = (color: HairColor) => {
    setSelectedColor(color);
    if (onSelect) onSelect(color.code);
  };

  const currentSelected = selectedColor || filteredColors.find(c => c.code === selectedCode);

  return (
    <div className="w-full">
      {/* Search and Filters */}
      <div className="space-y-4 mb-8">
        {/* Search Bar */}
        <div>
          <label className="font-paragraph text-sm text-secondary/70 block mb-3 uppercase tracking-wide">
            Buscar código
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-secondary/40" />
            <input
              type="text"
              placeholder="Ej: 613, R1B-4, DXB..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-secondary/20 bg-white text-secondary placeholder-secondary/40 font-paragraph text-sm focus:outline-none focus:border-secondary/50"
            />
          </div>
        </div>

        {/* Series Filter */}
        <div>
          <label className="font-paragraph text-sm text-secondary/70 block mb-3 uppercase tracking-wide">
            Serie
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSeries(null)}
              className={`px-4 py-2 font-paragraph text-sm transition-all border ${
                selectedSeries === null
                  ? 'bg-secondary text-white border-secondary'
                  : 'bg-white text-secondary border-secondary/20 hover:border-secondary/50'
              }`}
            >
              Todos
            </button>
            {Object.entries(seriesLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedSeries(key)}
                className={`px-4 py-2 font-paragraph text-sm transition-all border ${
                  selectedSeries === key
                    ? 'bg-secondary text-white border-secondary'
                    : 'bg-white text-secondary border-secondary/20 hover:border-secondary/50'
                }`}
              >
                {label}
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
                
                {/* Hair Image or Placeholder */}
                <div className="absolute inset-4 rounded-full overflow-hidden bg-secondary/5 flex items-center justify-center">
                  {currentSelected.hasImage && currentSelected.imageUrl ? (
                    <Image
                      src={currentSelected.imageUrl}
                      alt={currentSelected.code}
                      className="w-full h-full object-cover"
                      width={160}
                    />
                  ) : (
                    <div className="text-center px-4">
                      <p className="font-paragraph text-xs text-secondary/50">Imagen pendiente</p>
                    </div>
                  )}
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
                  {currentSelected.seriesLabel}
                </p>
              </div>
              <div className="space-y-2 text-sm font-paragraph text-secondary/60">
                <p><span className="font-semibold">Serie:</span> {currentSelected.seriesLabel}</p>
                {!currentSelected.hasImage && (
                  <p className="text-secondary/70 italic">Imagen pendiente</p>
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
              title={color.code}
            >
              {/* Circular Swatch - 40-44px */}
              <div className="relative">
                <div
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 transition-all flex items-center justify-center ${
                    selectedColor?.code === color.code || selectedCode === color.code
                      ? 'border-secondary ring-4 ring-secondary ring-offset-2'
                      : 'border-secondary/30 group-hover:border-secondary/70'
                  }`}
                  style={{ backgroundColor: color.hasImage ? 'transparent' : '#f0f0f0' }}
                >
                  {color.hasImage && color.imageUrl ? (
                    <Image
                      src={color.imageUrl}
                      alt={color.code}
                      className="w-full h-full object-cover"
                      width={44}
                    />
                  ) : (
                    <span className="text-xs text-secondary/30 font-semibold">?</span>
                  )}
                </div>
                
                {/* Indicator for missing image */}
                {!color.hasImage && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-destructive rounded-full border border-white"></div>
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
