
import React, { useMemo, useState } from 'react';
import { CIGARS_DATA } from '../constants';
import { Cigar } from '../types';
import CigarCard from './CigarCard';
import CigarDetailsModal from './CigarDetailsModal';

const MenuPage: React.FC = () => {
  const [selectedCigar, setSelectedCigar] = useState<Cigar | null>(null);
  const backgroundImage = import.meta.env.BASE_URL + 'images/cigar-collection-background.jpg';
  const headerBgImage = import.meta.env.BASE_URL + 'images/cigar-collection-background.jpg';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProfile, setFilterProfile] = useState<string | null>(null);

  const origins = useMemo(() => {
    const set = new Set(sortedCigars.map(c => c.origin));
    // Ensure Philippines shows first in the list
    const rest = Array.from(set).filter(o => o !== 'Philippines').sort((a,b)=>a.localeCompare(b));
    return ['Philippines', ...rest];
  }, [sortedCigars]);

  const profiles = useMemo(() => {
    const set = new Set(sortedCigars.map(c => c.profile));
    return Array.from(set).sort((a,b)=>a.localeCompare(b));
  }, [sortedCigars]);

  const visibleCigars = useMemo(() => {
    let base = filterOrigin ? sortedCigars.filter(c => c.origin === filterOrigin) : sortedCigars;
    if (filterProfile) {
      base = base.filter(c => c.profile === filterProfile);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      base = base.filter(c => c.name.toLowerCase().includes(q));
    }
    return base;
  }, [sortedCigars, filterOrigin, filterProfile, searchQuery]);

  return (
  <div className="relative min-h-screen bg-black">
      <img 
        src={backgroundImage}
        alt="Cigar collection background"
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-30"
      />
      <div className="fixed inset-0 bg-black/50 z-0" />
      
  <header className="fixed top-0 left-0 right-0 z-[60] relative overflow-hidden flex justify-center items-center bg-black/70 backdrop-blur border-b border-gray-700 px-4 sm:px-8 py-3">
        {/* Header background image */}
        <img
          src={headerBgImage}
          alt="Cigar header background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          aria-hidden="true"
        />
        {/* Smoke overlay (subtle, top-focused) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 blur-sm"
          style={{
            backgroundImage:
              'radial-gradient(120% 60% at 50% -20%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0) 75%)'
          }}
          aria-hidden="true"
        />
        {/* Darken for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/40" aria-hidden="true" />

        <h1
          className="relative font-serif text-[2rem] md:text-[3rem] font-bold text-center tracking-wide text-[#ff1a1a] drop-shadow-[0_0_10px_rgba(255,26,26,0.35)]"
          style={{ color: '#ff1a1a' }}
        >
          Ruby Wong's Cigars
        </h1>
      </header>

      <div className="pt-[5.5rem] px-4 sm:px-8 relative z-10">
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
              {/* Search by name */}
              <div className="mb-3">
                <label className="text-xs uppercase tracking-wider text-amber-200 block mb-1">Search by Name</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type cigar name..."
                  className="w-full px-2 py-1 rounded bg-gray-800 text-gray-200 border border-gray-600 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <p className="text-xs uppercase tracking-wider text-amber-200 mb-2">Filter by Country</p>
              <div className="flex flex-col gap-2 max-h-64 overflow-auto pr-1">
                <button
                  onClick={() => { setFilterOrigin(null); setFilterProfile(null); setSearchQuery(''); setFilterOpen(false); }}
                  className={`text-left px-3 py-2 rounded-md transition ${!filterOrigin && !filterProfile && !searchQuery ? 'bg-amber-700 text-black' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}`}
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

              <p className="text-xs uppercase tracking-wider text-amber-200 mt-4 mb-2">Filter by Profile</p>
              <div className="flex flex-col gap-2 max-h-48 overflow-auto pr-1">
                <button
                  onClick={() => { setFilterProfile(null); setFilterOpen(false); }}
                  className={`text-left px-3 py-2 rounded-md transition ${!filterProfile ? 'bg-amber-700 text-black' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}`}
                >
                  Any Profile
                </button>
                {profiles.map(profile => (
                  <button
                    key={profile}
                    onClick={() => { setFilterProfile(profile); setFilterOpen(false); }}
                    className={`text-left px-3 py-2 rounded-md transition ${filterProfile === profile ? 'bg-amber-700 text-black' : 'bg-gray-800 text-gray-200 hover:bg-gray-700'}`}
                  >
                    {profile}
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

