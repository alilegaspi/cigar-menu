import React from 'react';
import { Cigar } from '../types';

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
          className="absolute top-4 right-4 w-14 h-14 object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-2xl font-bold text-amber-100 truncate group-hover:text-amber-300 transition-colors">
          {cigar.name}
        </h3>
        <p className="text-gray-400 mt-1">{cigar.origin}</p>
        <p className="text-amber-400 text-xl font-semibold mt-4">{cigar.price}</p>
      </div>
    </div>
  );
};

export default CigarCard;