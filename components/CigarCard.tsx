import React from 'react';
import { Cigar } from '../types';

// Reuse flag emoji mapping (duplicated from modal; consider refactor later)
const getFlagEmoji = (origin: string): string => {
  const key = origin.trim().toLowerCase();
  const map: Record<string, string> = {
    'cuba': '🇨🇺',
    'dominican republic': '🇩🇴',
    'dominican  republic': '🇩🇴',
    'nicaragua': '🇳🇮',
    'honduras': '🇭🇳',
    'philippines': '🇵🇭',
    'the philippines': '🇵🇭',
    'indonesia': '🇮🇩',
    'ecuador': '🇪🇨',
    'mexico': '🇲🇽',
    'brazil': '🇧🇷',
    'spain': '🇪🇸',
    'italy': '🇮🇹',
    'switzerland': '🇨🇭',
    'united states': '🇺🇸',
    'u.s.a.': '🇺🇸',
    'usa': '🇺🇸',
  };
  if (map[key]) return map[key];
  const found = Object.keys(map).find(k => key.includes(k));
  return found ? map[found] : '🌍';
};

// Prefer small flag images on desktop where some environments render emoji flags as initials.
// Falls back to emoji if no asset is available.
const getFlagImage = (origin: string): string | null => {
  const key = origin.trim().toLowerCase();
  const map: Record<string, string> = {
    'philippines': 'Philippines.png',
    'the philippines': 'Philippines.png',
    'dominican republic': 'Dominican Republic.png',
    'dominican  republic': 'Dominican Republic.png',
    'nicaragua': 'Nicaragua.png',
  };
  if (map[key]) return `${import.meta.env.BASE_URL}images/${map[key]}`;
  return null;
};

interface CigarCardProps {
  cigar: Cigar;
  onSelect: () => void;
}

const CigarCard: React.FC<CigarCardProps> = ({ cigar, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg shadow-black/30
                 cursor-pointer group transform hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="relative h-64">
        <img
          src={`${import.meta.env.BASE_URL}${cigar.image}`}
          alt={cigar.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <img
          src={`${import.meta.env.BASE_URL}images/RWG.png`}
          alt="Ruby Wong's Godown Logo"
          className="absolute top-4 left-4 w-14 h-14 object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-2xl font-bold text-amber-100 truncate group-hover:text-amber-300 transition-colors">
          {cigar.name}
        </h3>
        <p className="text-gray-400 mt-1 flex items-center gap-2">
          <span>{cigar.origin}</span>
          {getFlagImage(cigar.origin) ? (
            <img
              src={getFlagImage(cigar.origin)!}
              alt={`${cigar.origin} flag`}
              className="w-5 h-5 object-contain"
            />
          ) : (
            <span aria-hidden="true">{getFlagEmoji(cigar.origin)}</span>
          )}
          <span className="sr-only">{`${cigar.origin} flag`}</span>
        </p>
        <p className="text-gray-300 text-sm mt-2 line-clamp-2">
          {cigar.profile} • {cigar.vitola} • {cigar.wrapper}
        </p>
        <p className="text-amber-400 text-xl font-semibold mt-4">{cigar.price}</p>
      </div>
    </div>
  );
};

export default CigarCard;
