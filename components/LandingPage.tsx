import React from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div 
      className="flex flex-col items-center justify-end h-screen bg-black p-4 pb-20 md:pb-24"
      style={{
        backgroundImage: "url('/images/landing page.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <button
        onClick={onEnter}
        className="font-serif bg-red-800 text-amber-100 font-bold py-3 px-12 text-xl rounded-sm tracking-widest
                    hover:bg-red-700 transition-colors duration-300
                    transform hover:scale-105 shadow-2xl shadow-black/60"
      >
        Cigar Menu
      </button>
    </div>
  );
};

export default LandingPage;