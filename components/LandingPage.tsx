import React from "react";

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const imagePath = import.meta.env.BASE_URL + 'images/landing-page.jpg';
  
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black overflow-hidden">
      <img 
        src={imagePath}
        alt="Landing background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
        onError={(e) => {
          console.error('Failed to load image:', imagePath);
          e.currentTarget.style.display = 'none';
        }}
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <button
        onClick={onEnter}
        className="relative z-20 font-serif bg-red-800 text-amber-100 font-bold py-3 px-12 text-xl rounded-sm tracking-widest
                  hover:bg-red-700 transition-colors duration-300
                  transform hover:scale-105 shadow-2xl shadow-black/60 mt-[10vh] md:mb-32 md:mt-0"
      >
        Cigar Menu
      </button>
    </div>
  );
};

export default LandingPage;
