import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Campaign } from '../types';
import { Pencil, Copy, Trash2, BarChart2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { toast } from 'react-hot-toast';

const CampaignsList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState<'created_at' | 'name'>('created_at');
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showStats, setShowStats] = useState<any | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No authenticated user found');

        let query = supabase
          .from('campaigns')
          .select('*')
          .eq('user_id', user.id);

        if (searchTerm) {
          query = query.ilike('name', `%${searchTerm}%`);
        }

        query = query.order(sortBy, { ascending: sortOrder === 'asc' });

        const { data, error } = await query;

        if (error) throw error;

        setCampaigns(data || []);
        setSelectAll(false);
        setSelectedCampaigns([]);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setError(err instanceof Error ? err.message : 'Failed to load campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [searchTerm, sortOrder, sortBy]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No authenticated user found');

        const { data, error } = await supabase
          .from('campaign_analytics')
          .select('campaign_id, event_type, count')
          .in('event_type', ['view', 'participation', 'completion', 'form_submission']);

        if (error) throw error;

        const statsByCampaign = data?.reduce((acc: any, item: any) => {
          if (!acc[item.campaign_id]) {
            acc[item.campaign_id] = {};
          }
          acc[item.campaign_id][item.event_type] = item.count;
          return acc;
        }, {});

        setShowStats(statsByCampaign);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (field: 'created_at' | 'name') => {
    setSortBy(field);
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleCampaignSelect = (id: string) => {
    setSelectedCampaigns(prev => {
      if (prev.includes(id)) {
        return prev.filter(campaignId => campaignId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCampaigns([]);
    } else {
      setSelectedCampaigns(campaigns.map(campaign => campaign.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteCampaign = async (id: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
      setSelectedCampaigns(prev => prev.filter(campaignId => campaignId !== id));
      toast.success('Campaign deleted successfully!');
    } catch (err) {
      console.error('Error deleting campaign:', err);
      toast.error('Failed to delete campaign');
    }
  };

  const handleDuplicateCampaign = async (campaign: Campaign) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      const { id, ...campaignData } = campaign;

      const newCampaign: Omit<Campaign, 'id'> = {
        ...campaignData,
        name: `${campaign.name} (Copy)`,
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('campaigns')
        .insert(newCampaign)
        .select()
        .single();

      if (error) throw error;

      setCampaigns(prev => [...prev, data]);
      toast.success('Campaign duplicated successfully!');
    } catch (err) {
      console.error('Error duplicating campaign:', err);
      toast.error('Failed to duplicate campaign');
    }
  };

  const handleDeleteSelected = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user found');

      const { error } = await supabase
        .from('campaigns')
        .delete()
        .in('id', selectedCampaigns)
        .eq('user_id', user.id);

      if (error) throw error;

      setCampaigns(prev => prev.filter(campaign => !selectedCampaigns.includes(campaign.id)));
      setSelectedCampaigns([]);
      setSelectAll(false);
      toast.success('Selected campaigns deleted successfully!');
    } catch (err) {
      console.error('Error deleting selected campaigns:', err);
      toast.error('Failed to delete selected campaigns');
    }
  };

  const isTypeQuiz = (campaign: Campaign) => campaign.type === 'quiz';
  const isTypeSurvey = (campaign: Campaign) => campaign.type === 'survey';
  const isTypeContest = (campaign: Campaign) => campaign.type === 'contest';
  const isTypeForm = (campaign: Campaign) => campaign.type === 'form';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#841b60]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Campaigns</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search campaigns..."
          className="px-4 py-2 border rounded-md w-1/3"
          onChange={handleSearchChange}
        />
        {selectedCampaigns.length > 0 && (
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-[#841b60] rounded-md"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </label>
              </th>
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={() => handleSortChange('name')}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th
                className="px-4 py-3 text-left cursor-pointer"
                onClick={() => handleSortChange('created_at')}
              >
                Created At {sortBy === 'created_at' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-4 py-3 text-left">Views</th>
              <th className="px-4 py-3 text-left">Participants</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(campaign => {
              const startDate = campaign.start_date ? new Date(campaign.start_date) : new Date();
              const formattedDate = startDate.toLocaleDateString();
              const campaignDate = campaign.created_at ? new Date(campaign.created_at) : new Date();
              const timeAgo = formatDistanceToNow(campaignDate, { addSuffix: true, locale: enUS });
              const participantsCount = showStats?.participants ?? 0;

              return (
                <tr key={campaign.id} className="border-b">
                  <td className="px-4 py-3">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-[#841b60] rounded-md"
                        checked={selectedCampaigns.includes(campaign.id)}
                        onChange={() => handleCampaignSelect(campaign.id)}
                      />
                    </label>
                  </td>
                  <td className="px-4 py-3">{campaign.name}</td>
                  <td className="px-4 py-3">
                    {isTypeQuiz(campaign) ? 'Quiz' :
                      isTypeSurvey(campaign) ? 'Survey' :
                        isTypeContest(campaign) ? 'Contest' :
                          isTypeForm(campaign) ? 'Form' : 'Unknown'}
                  </td>
                  <td className="px-4 py-3">{campaign.status}</td>
                  <td className="px-4 py-3">{timeAgo}</td>
                  <td className="px-4 py-3">{showStats?.[campaign.id]?.view || 0}</td>
                  <td className="px-4 py-3">{showStats?.[campaign.id]?.participation || 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Link to={`/dashboard/campaigns/edit/${campaign.id}`}>
                        <button className="text-gray-600 hover:text-gray-800">
                          <Pencil className="w-5 h-5" />
                        </button>
                      </Link>
                      <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={() => handleDuplicateCampaign(campaign)}
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteCampaign(campaign.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <Link to={`/dashboard/campaigns/stats/${campaign.id}`}>
                        <button className="text-gray-600 hover:text-gray-800">
                          <BarChart2 className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignsList;
