
import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import CampaignCard from '../components/CampaignCard';
import { Campaign, StatCard as StatCardType } from '../types';
import { supabase } from '../lib/supabase';

const Dashboard = () => {
  const [campaigns] = useState<Campaign[]>([]);
  const [recentCampaigns] = useState<Campaign[]>([]);

  // Fix the cards to properly use the StatCard interface
  const statCards: StatCardType[] = [
    {
      title: "Campaigns",
      value: campaigns.length,
      change: "+12%",
      icon: "trending-up",
      positive: true,
      stat: "from last month"
    },
    {
      title: "Active Campaigns",
      value: campaigns.filter(c => c.status === 'active').length,
      change: "+8%",
      icon: "activity",
      positive: true,
      stat: "from last month"
    },
    {
      title: "Total Participants",
      value: campaigns.reduce((sum, campaign) => sum + (campaign.participants || 0), 0),
      change: "+25%",
      icon: "users",
      positive: true,
      stat: "from last month"
    },
    {
      title: "Completion Rate",
      value: "84%",
      change: "+4%",
      icon: "percent",
      positive: true,
      stat: "from last month"
    }
  ];

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </header>
      
      {/* Stats Overview */}
      <section className="mb-10">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>
      </section>
      
      {/* Recent Campaigns */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Campaigns</h2>
          <Link 
            to="/dashboard/campaigns"
            className="text-sm text-[#841b60] hover:text-[#6d1750] font-medium"
          >
            View All
          </Link>
        </div>
        
        {recentCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-gray-600 mb-4">You haven't created any campaigns yet.</p>
            <Link
              to="/dashboard/campaigns/new"
              className="inline-block px-4 py-2 bg-[#841b60] text-white rounded-md hover:bg-[#6d1750] transition-colors"
            >
              Create Your First Campaign
            </Link>
          </div>
        )}
      </section>
      
      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/dashboard/campaigns/new?type=quiz"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow transition-shadow border-l-4 border-blue-500"
          >
            <h3 className="font-medium text-gray-900 mb-2">Create Quiz</h3>
            <p className="text-gray-600 text-sm">Engage your audience with interactive quizzes.</p>
          </Link>
          
          <Link
            to="/dashboard/campaigns/new?type=survey"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow transition-shadow border-l-4 border-green-500"
          >
            <h3 className="font-medium text-gray-900 mb-2">Create Survey</h3>
            <p className="text-gray-600 text-sm">Collect valuable feedback from your audience.</p>
          </Link>
          
          <Link
            to="/dashboard/campaigns/new?type=contest"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow transition-shadow border-l-4 border-purple-500"
          >
            <h3 className="font-medium text-gray-900 mb-2">Create Contest</h3>
            <p className="text-gray-600 text-sm">Run engaging contests to grow your audience.</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
