
import React from 'react';
import CreativeStudioHeader from './CreativeStudioHeader';
import CreativeHero from './CreativeHero';
import GameTypeBubbles from './GameTypeBubbles';
import RecentCreations from './RecentCreations';
import './CreativeStudio.css';

const CreativeStudioDashboard: React.FC = () => {
  return (
    <div className="creative-dashboard">
      <CreativeStudioHeader />
      <main>
        <CreativeHero />
        <GameTypeBubbles />
        <RecentCreations />
      </main>
    </div>
  );
};

export default CreativeStudioDashboard;
