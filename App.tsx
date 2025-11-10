
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MenuPage from './components/MenuPage';

const App: React.FC = () => {
  const [page, setPage] = useState<'landing' | 'menu'>('landing');

  const goToMenu = () => {
    setPage('menu');
  };

  const goToLanding = () => {
    setPage('landing');
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {page === 'landing' && <LandingPage onEnter={goToMenu} />}
  {page === 'menu' && <MenuPage />}
    </div>
  );
};

export default App;
