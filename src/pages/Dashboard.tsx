
import React from 'react';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import QuickCreationSection from '../components/Dashboard/QuickCreationSection';
import TiltedCards from '../components/Dashboard/TiltedCards';
import StatsGrid from '../components/Dashboard/StatsGrid';
import RecentCampaigns from '../components/Dashboard/RecentCampaigns';

const Dashboard: React.FC = () => {
  return (
    <div className="-mx-6 -mt-6">
      <DashboardHeader />

      <div className="px-6 space-y-6">
        {/* Zone de superposition avec le rectangle de création rapide au-dessus des cartes inclinées */}
        <div className="relative">
          {/* Cartes inclinées en arrière-plan */}
          <div className="pt-20">
            <TiltedCards />
          </div>
          
          {/* Rectangle de création rapide superposé */}
          <div className="absolute top-0 left-0 right-0 z-10">
            <QuickCreationSection />
          </div>
        </div>
        
        <StatsGrid />
        <RecentCampaigns />
      </div>
    </div>
  );
};

export default Dashboard;
