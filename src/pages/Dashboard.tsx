
import React, { useState, useEffect } from 'react';
import { Campaign } from '../types';
import { Link } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';
import CampaignCard from '../components/CampaignCard';
import StatCard from '../components/StatCard';

const Dashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No authenticated user found');

        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setCampaigns(data || []);
        setFilteredCampaigns(data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setShowFilterMenu(false);

    if (filter === 'all') {
      setFilteredCampaigns(campaigns);
    } else {
      setFilteredCampaigns(campaigns.filter(campaign => campaign.type === filter));
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    try {
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update both state arrays
      const updatedCampaigns = campaigns.filter(campaign => campaign.id !== id);
      setCampaigns(updatedCampaigns);
      setFilteredCampaigns(updatedCampaigns.filter(campaign => {
        return activeFilter === 'all' || campaign.type === activeFilter;
      }));

    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#841b60]"></div>
      </div>
    );
  }

  // Get stats for the dashboard
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const draftCampaigns = campaigns.filter(c => c.status === 'draft').length;
  const scheduledCampaigns = campaigns.filter(c => c.status === 'scheduled').length;

  const stats = [
    {
      title: 'Total Campaigns',
      value: totalCampaigns,
      change: '+20%',
      icon: 'chart-bar',
      positive: true,
    },
    {
      title: 'Active Campaigns',
      value: activeCampaigns,
      change: '+5%',
      icon: 'play',
      positive: true,
    },
    {
      title: 'Draft Campaigns',
      value: draftCampaigns,
      change: '-2%',
      icon: 'document',
      positive: false,
    },
    {
      title: 'Scheduled Campaigns',
      value: scheduledCampaigns,
      change: '+15%',
      icon: 'calendar',
      positive: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0">Dashboard</h1>
        <Link to="/dashboard/campaigns" className="text-[#841b60] hover:underline">
          View all campaigns
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold mb-4 md:mb-0">Recent Campaigns</h2>
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Filter size={16} />
              <span>Filter: {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}</span>
            </button>
            
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                <div className="py-1">
                  <button
                    onClick={() => handleFilterChange('all')}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${activeFilter === 'all' ? 'bg-gray-100' : ''}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleFilterChange('quiz')}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${activeFilter === 'quiz' ? 'bg-gray-100' : ''}`}
                  >
                    Quiz
                  </button>
                  <button
                    onClick={() => handleFilterChange('survey')}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${activeFilter === 'survey' ? 'bg-gray-100' : ''}`}
                  >
                    Survey
                  </button>
                  <button
                    onClick={() => handleFilterChange('form')}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${activeFilter === 'form' ? 'bg-gray-100' : ''}`}
                  >
                    Form
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/dashboard/campaigns/new"
            className="flex items-center justify-center space-x-1 px-4 py-2 bg-[#841b60] text-white rounded-md hover:bg-[#6d1750] transition-colors"
          >
            <Plus size={16} />
            <span>New Campaign</span>
          </Link>
        </div>
      </div>

      {filteredCampaigns.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">No campaigns found. Create your first campaign!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.slice(0, 6).map((campaign) => (
            <CampaignCard 
              key={campaign.id} 
              campaign={campaign} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
