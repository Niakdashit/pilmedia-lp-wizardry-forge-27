import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BarChart3, Calendar, Users } from 'lucide-react';
import StatCard from '../components/StatCard';
import CampaignCard from '../components/CampaignCard';
import { Campaign } from '../types';
import { supabase } from '../lib/supabase';

const Dashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeCampaigns: 0,
    totalParticipants: 0,
    conversionRate: 0,
    averageEngagement: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No authenticated user found');

        const { data, error } = await supabase
          .from('campaigns')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setCampaigns(data || []);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    const calculateStats = () => {
      const activeCampaignsCount = campaigns.filter(campaign => campaign.status === 'active').length;
      const totalParticipantsCount = campaigns.reduce((sum, campaign) => sum + (campaign.participants || 0), 0);
      const conversionRateValue = activeCampaignsCount > 0 ? 75 : 25;
      const averageEngagementValue = totalParticipantsCount > 0 ? 60 : 10;

      setStats({
        activeCampaigns: activeCampaignsCount,
        totalParticipants: totalParticipantsCount,
        conversionRate: conversionRateValue,
        averageEngagement: averageEngagementValue,
      });
    };

    calculateStats();
  }, [campaigns]);
  
  // Remove unused function or handle the campaign deletion
  // const handleDeleteCampaign = async (id: string) => {
  //   // Implementation if needed
  // };
  
  const handleCreateCampaign = (type: Campaign['type']) => {
    navigate(`/dashboard/campaigns/new?type=${type}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500">Bienvenue sur votre espace de gestion de campagnes</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2 flex">
          <button
            onClick={() => handleCreateCampaign('quiz')}
            className="bg-[#841b60] hover:bg-[#6d1750] text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus className="mr-2 w-4 h-4" />
            Créer un Quiz
          </button>
          <button
            onClick={() => handleCreateCampaign('survey')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus className="mr-2 w-4 h-4" />
            Créer un Sondage
          </button>
          <button
            onClick={() => handleCreateCampaign('contest')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus className="mr-2 w-4 h-4" />
            Créer un Concours
          </button>
          <button
            onClick={() => handleCreateCampaign('form')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus className="mr-2 w-4 h-4" />
            Créer un Formulaire
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Campagnes Actives"
          value={stats.activeCampaigns}
          change="+12%"
          icon="bar-chart-3"
          positive
          stat="campaigns"
        />
        <StatCard
          title="Total Participants"
          value={stats.totalParticipants}
          change="+18%"
          icon="users"
          positive
          stat="participants"
        />
        <StatCard
          title="Taux de Conversion"
          value={`${stats.conversionRate}%`}
          change="+5%"
          icon="percent"
          positive
          stat="conversion"
        />
        <StatCard
          title="Engagement Moyen"
          value={`${stats.averageEngagement}%`}
          change="-3%"
          icon="activity"
          positive={false}
          stat="engagement"
        />
      </div>
      
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participants
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date de création
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
