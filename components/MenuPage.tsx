
import React, { useMemo, useState } from 'react';
import { CIGARS_DATA } from '../constants';
import { Cigar } from '../types';
import CigarCard from './CigarCard';
import CigarDetailsModal from './CigarDetailsModal';

interface MenuPageProps {
  onBack: () => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ onBack }) => {
  const [selectedCigar, setSelectedCigar] = useState<Cigar | null>(null);
  const backgroundImage = import.meta.env.BASE_URL + 'images/cigar-collection-background.jpg';

  // Sort cigars by origin: Philippines first, then other origins alphabetically; within origin, sort by name
  const sortedCigars = useMemo(() => [...CIGARS_DATA].sort((a, b) => {
    const pri = (o: string) => (o === 'Philippines' ? 0 : 1);
    const pa = pri(a.origin);
    const pb = pri(b.origin);
    if (pa !== pb) return pa - pb;
    const oCmp = a.origin.localeCompare(b.origin);
    if (oCmp !== 0) return oCmp;
    return a.name.localeCompare(b.name);
  }), []);

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterOrigin, setFilterOrigin] = useState<string | null>(null);

  const origins = useMemo(() => {
    const set = new Set(sortedCigars.map(c => c.origin));
    // Ensure Philippines shows first in the list
    const rest = Array.from(set).filter(o => o !== 'Philippines').sort((a,b)=>a.localeCompare(b));
    return ['Philippines', ...rest];
  }, [sortedCigars]);

  const visibleCigars = useMemo(() => {
    const base = filterOrigin ? sortedCigars.filter(c => c.origin === filterOrigin) : sortedCigars;
    return base;
  }, [sortedCigars, filterOrigin]);

  return (
    <div className="relative p-4 sm:p-8 min-h-screen bg-black overflow-auto">
      <img 
        src={backgroundImage}
        alt="Cigar collection background"
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-30"
      />
      <div className="fixed inset-0 bg-black/50 z-0" />
      
      <div className="relative z-10">
        <header className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-amber-300 hover:text-amber-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center text-amber-100">
            Our Collection
          </h1>
          <div className="w-24 hidden sm:block"></div> {/* Spacer */}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {visibleCigars.map((cigar) => (
            <CigarCard
              key={cigar.id}
              cigar={cigar}
              onSelect={() => setSelectedCigar(cigar)}
            />
          ))}
        </div>

        {/* Floating filter button */}
        <div className="fixed left-4 bottom-4 z-50">
          <button
            onClick={() => setFilterOpen(v => !v)}
            className="w-12 h-12 rounded-full bg-amber-600 text-black font-bold shadow-lg shadow-black/40
                       hover:bg-amber-500 transition flex items-center justify-center"
            aria-label="Filter by origin"
          >
            {filterOpen ? '×' : '≡'}
          </button>

          {filterOpen && (
            <div className="mt-3 p-3 rounded-lg bg-gray-900/95 border border-gray-700 shadow-xl w-56">
              <p className="text-xs uppercase tracking-wider text-amber-200 mb-2">Filter by Country</p>
              <div className="flex flex-col gap-2 max-h-64 overflow-auto pr-1">
                <button
                  onClick={() => { setFilterOrigin(null); setFilterOpen(false); }}
                  className={`text-left px-3 py-2 rounded-md transition ${!filterOrigin ? 'bg-amber-700 text-black' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}`}
                >
                  Show All
                </button>
                {origins.map(origin => (
                  <button
                    key={origin}
                    onClick={() => { setFilterOrigin(origin); setFilterOpen(false); }}
                    className={`text-left px-3 py-2 rounded-md transition ${filterOrigin === origin ? 'bg-amber-700 text-black' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}`}
                  >
                    {origin}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedCigar && (
        <CigarDetailsModal
          cigar={selectedCigar}
          onClose={() => setSelectedCigar(null)}
        />
      )}
    </div>
  );
};

export default MenuPage;

