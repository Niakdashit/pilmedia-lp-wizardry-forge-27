
import React from 'react';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import QuickCreationSection from '../components/Dashboard/QuickCreationSection';
import StatsGrid from '../components/Dashboard/StatsGrid';
import RecentCampaigns from '../components/Dashboard/RecentCampaigns';
import FloatingActionButton from '../components/Dashboard/FloatingActionButton';

const Dashboard: React.FC = () => {
  return (
    <div className="-mx-6 -mt-6 min-h-screen">
      <DashboardHeader />

      <div className="px-8 py-8 space-y-12">
        <QuickCreationSection />
        <StatsGrid />
        <RecentCampaigns />
      </div>

      <FloatingActionButton />
    </div>
  );
};

export default Dashboard;
