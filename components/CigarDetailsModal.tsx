
import React, { useEffect } from 'react';
import { Cigar } from '../types';

interface CigarDetailsModalProps {
  cigar: Cigar;
  onClose: () => void;
}

// Helper component defined outside the main component to avoid re-creation on render
const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-sm text-amber-200 opacity-80">{label}</p>
    <p className="font-semibold text-lg text-white">{value}</p>
  </div>
);

const CigarDetailsModal: React.FC<CigarDetailsModalProps> = ({ cigar, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              onClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
           window.removeEventListener('keydown', handleEsc);
           document.body.style.overflow = 'unset';
        };
    }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-2xl shadow-black/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto 
                   flex flex-col md:flex-row relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="w-full md:w-1/3 flex-shrink-0 relative aspect-square">
          <img 
            src={`${import.meta.env.BASE_URL}${cigar.image}`} 
            alt={cigar.name} 
            className="w-full h-full object-contain rounded-t-lg md:rounded-l-lg md:rounded-t-none" 
          />
        </div>
        
        <div className="p-8 flex-1 flex flex-col">
          <h2 className="font-serif text-4xl font-bold text-amber-200">{cigar.name}</h2>
          <p className="text-amber-400 text-2xl font-semibold mt-1 mb-6">{cigar.price}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 mb-6 border-y border-gray-700 py-6">
            <DetailItem label="Origin" value={cigar.origin} />
            <DetailItem label="Profile" value={cigar.profile} />
            <DetailItem label="Vitola" value={cigar.vitola} />
            <DetailItem label="Wrapper" value={cigar.wrapper} />
            <DetailItem label="Binder" value={cigar.binder} />
            <DetailItem label="Filler" value={cigar.filler} />
          </div>

          <div className="flex-1 w-full">
            <h3 className="font-serif text-2xl font-bold text-amber-200 mb-4">Why this Cigar?</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
                {cigar.description}
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scale-up {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-up { animation: scale-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CigarDetailsModal;
