import HairColorSelector from './HairColorSelector';

interface ColorRingProps {
  onSelect?: (code: string) => void;
  selectedCode?: string;
  showGuideLink?: boolean;
  compact?: boolean;
}

export default function ColorRing({ onSelect, selectedCode, showGuideLink = false, compact = false }: ColorRingProps) {
  return (
    <div className="w-full">
      <HairColorSelector onSelect={onSelect} selectedCode={selectedCode} compact={compact} />
      {showGuideLink && (
        <a href="/academy/color-ring" className="inline-block mt-4 font-paragraph text-sm underline text-secondary">
          Ver guía completa de color
        </a>
      )}
    </div>
  );
}
