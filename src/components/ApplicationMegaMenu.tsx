import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ApplicationMegaMenuProps {
  selectedApplication: string;
  onSelect: (application: string) => void;
}

const APPLICATION_CATEGORIES = {
  'Hair Weft': [
    'Genius Weft',
    'Hand Tied Weft',
    'Flat Weft',
    'Double Piece Flat Weft',
    'Machine Weft',
    'Volume Weft',
    'Genius Weft with Hole',
    'Genius UP with Hole',
    'Halo',
    'Ponytail'
  ],
  'Clip In': [
    'One Piece Clip In',
    'Clip In',
    'Lace Clip In',
    'PU Clip In'
  ],
  'Tape In': [
    'Tape In',
    'Mini Tape In',
    'Seamless Tape In',
    'Invisible Tape In',
    'PU Invisible with Hole',
    'PU with Hole',
    'Long Invisible Tape In',
    'Long Tape In',
    'Stitched Tape In'
  ],
  'Keratin Hair Extension': [
    'I-Tip',
    'Nano-Tip',
    'K-Tip',
    'U-Tip',
    'Plastic Nano Tip',
    'V-Tip',
    'Y-Tip'
  ],
  'Feather Hair Extension': [
    'Micro Loop Hair Extension',
    'Feather Hair Weft',
    'H6 Feather Hair Extension'
  ]
};

export default function ApplicationMegaMenu({
  selectedApplication,
  onSelect
}: ApplicationMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (application: string) => {
    onSelect(application);
    setIsOpen(false);
  };

  const displayLabel = selectedApplication === 'all' 
    ? 'Aplicación' 
    : selectedApplication;

  return (
    <div className="relative w-full">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-primary/20 bg-white text-primary font-paragraph text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-between hover:bg-primary/5 transition-colors"
      >
        <span>{displayLabel}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Mega Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-primary/20 shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-5 gap-6 p-8">
              {Object.entries(APPLICATION_CATEGORIES).map(([category, items]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-heading text-sm text-primary font-semibold uppercase tracking-wide">
                    {category}
                  </h4>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item}>
                        <button
                          onClick={() => handleSelect(item)}
                          className={`text-sm font-paragraph transition-all duration-200 hover:text-primary/70 ${
                            selectedApplication === item
                              ? 'text-primary font-semibold'
                              : 'text-primary/60'
                          }`}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile: Accordion Layout */}
            <div className="md:hidden space-y-0">
              {Object.entries(APPLICATION_CATEGORIES).map(([category, items]) => (
                <MobileAccordionItem
                  key={category}
                  category={category}
                  items={items}
                  selectedApplication={selectedApplication}
                  onSelect={handleSelect}
                />
              ))}
            </div>

            {/* Clear Selection Option */}
            <div className="border-t border-primary/10 p-4">
              <button
                onClick={() => handleSelect('all')}
                className="w-full text-sm font-paragraph text-primary/60 hover:text-primary transition-colors py-2"
              >
                Ver Todas las Aplicaciones
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close menu when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

interface MobileAccordionItemProps {
  category: string;
  items: string[];
  selectedApplication: string;
  onSelect: (item: string) => void;
}

function MobileAccordionItem({
  category,
  items,
  selectedApplication,
  onSelect
}: MobileAccordionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-primary/10">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-primary/5 transition-colors"
      >
        <h4 className="font-heading text-sm text-primary font-semibold">
          {category}
        </h4>
        <ChevronDown
          size={18}
          className={`text-primary/60 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-primary/5"
          >
            <ul className="space-y-2 px-4 py-3">
              {items.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onSelect(item)}
                    className={`text-sm font-paragraph transition-all duration-200 w-full text-left py-1 ${
                      selectedApplication === item
                        ? 'text-primary font-semibold'
                        : 'text-primary/60 hover:text-primary'
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
