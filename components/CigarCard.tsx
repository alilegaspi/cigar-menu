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

// Inline SVG flag renderers for consistent desktop display (simplified designs)
const renderInlineFlag = (origin: string) => {
  const key = origin.trim().toLowerCase();
  switch (key) {
    case 'philippines':
    case 'the philippines':
      return (
        <svg
          aria-label="Philippines flag"
          role="img"
          viewBox="0 0 60 40"
          className="w-5 h-5 flex-shrink-0 rounded shadow-sm"
        >
          <rect width="60" height="40" fill="#0038A8" />
          <rect y="20" width="60" height="20" fill="#CE1126" />
          <polygon points="0,0 25,20 0,40" fill="#ffffff" />
          <circle cx="10" cy="20" r="5" fill="#FCD116" />
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const x1 = 10 + Math.cos(angle) * 7;
            const y1 = 20 + Math.sin(angle) * 7;
            const x2 = 10 + Math.cos(angle) * 10;
            const y2 = 20 + Math.sin(angle) * 10;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FCD116" strokeWidth={1} />;
          })}
        </svg>
      );
    case 'dominican republic':
    case 'dominican  republic':
      return (
        <svg
          aria-label="Dominican Republic flag"
          role="img"
          viewBox="0 0 60 40"
          className="w-5 h-5 flex-shrink-0 rounded shadow-sm"
        >
          <rect width="60" height="40" fill="#fff" />
          <rect x="0" y="0" width="30" height="18" fill="#002D62" />
            <rect x="30" y="0" width="30" height="18" fill="#CE1126" />
            <rect x="0" y="22" width="30" height="18" fill="#CE1126" />
            <rect x="30" y="22" width="30" height="18" fill="#002D62" />
            <rect x="27" y="0" width="6" height="40" fill="#fff" />
            <rect x="0" y="17" width="60" height="6" fill="#fff" />
            <circle cx="30" cy="20" r="5" fill="#002D62" stroke="#CE1126" strokeWidth={1} />
        </svg>
      );
    case 'nicaragua':
      return (
        <svg
          aria-label="Nicaragua flag"
          role="img"
          viewBox="0 0 60 40"
          className="w-5 h-5 flex-shrink-0 rounded shadow-sm"
        >
          <rect width="60" height="40" fill="#ffffff" />
          <rect width="60" height="12" y="0" fill="#0067C6" />
          <rect width="60" height="12" y="28" fill="#0067C6" />
          <polygon points="30,15 35,25 25,25" fill="#0067C6" />
        </svg>
      );
    default:
      return null;
  }
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
          {renderInlineFlag(cigar.origin) || (
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
