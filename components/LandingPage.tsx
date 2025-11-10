import React from "react";

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="relative flex flex-col items-center justify-end h-screen bg-black p-4 pb-20 md:pb-24 overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/cigar-menu/images/landing-page.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.9
        }}
      />
      <div className="absolute inset-0 bg-black/40 z-0" />
      <button
        onClick={onEnter}
        className="relative z-10 font-serif bg-red-800 text-amber-100 font-bold py-3 px-12 text-xl rounded-sm tracking-widest
                  hover:bg-red-700 transition-colors duration-300
                  transform hover:scale-105 shadow-2xl shadow-black/60"
      >
        Cigar Menu
      </button>
    </div>
  );
};

export default LandingPage;
