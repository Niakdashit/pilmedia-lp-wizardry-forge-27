import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import CampaignCard from '../components/CampaignCard';
import FormatModal from '../components/FormatModal';
import { Campaign, StatCard as StatCardType } from '../types';
import { PlusIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showFormatModal, setShowFormatModal] = useState(false);
  const [recentCampaigns, setRecentCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    loadRecentCampaigns();
  }, []);

  const loadRecentCampaigns = async () => {
    try {
      setError(null);
      const { data, error: supabaseError } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error(supabaseError.message);
      }
      
      setRecentCampaigns(data || []);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load campaigns';
      console.error('Error loading recent campaigns:', error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  // Example data
  const stats: StatCardType[] = [
    {
      title: 'Campagnes actives',
      value: 5,
      change: '+2 cette semaine',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>',
      positive: true
    },
    {
      title: 'Participations',
      value: 1254,
      change: '+18% ce mois',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>',
      positive: true
    },
    {
      title: 'Taux de conversion',
      value: '42%',
      change: '+5% ce mois',
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>',
      positive: true
    }
  ];

  const handleCreateCampaign = () => {
    setShowFormatModal(true);
  };

  const handleViewAllCampaigns = () => {
    navigate('/dashboard/campaigns');
  };

  const handleCampaignDelete = async (campaignId: string) => {
    setRecentCampaigns(recentCampaigns.filter(c => c.id !== campaignId));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <button 
          className="btn-primary px-4 py-2 rounded-md flex items-center"
          onClick={handleCreateCampaign}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Nouvelle campagne
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Recent Campaigns */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Campagnes récentes</h2>
          <button 
            className="text-[#841b60] font-medium flex items-center"
            onClick={handleViewAllCampaigns}
          >
            Voir toutes
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#841b60]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCampaigns.map(campaign => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                onDelete={() => handleCampaignDelete(campaign.id)}
              />
            ))}
            {recentCampaigns.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                No campaigns found. Create your first campaign to get started!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Format Modal */}
      <FormatModal 
        isOpen={showFormatModal} 
        onClose={() => setShowFormatModal(false)} 
      />
    </div>
  );
};

export default Dashboard;