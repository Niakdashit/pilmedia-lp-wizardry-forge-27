
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Campaign } from '../types';
import { supabase } from '../lib/supabase';

const PublicCampaign = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) {
        setError("No campaign ID provided");
        setLoading(false);
        return;
      }

      try {
        // Fetch the campaign data
        const { data: campaignData, error: campaignError } = await supabase
          .from('campaigns')
          .select('*')
          .eq('id', id)
          .single();

        if (campaignError) {
          throw campaignError;
        }

        if (!campaignData) {
          setError("Campaign not found");
          setLoading(false);
          return;
        }

        // Check if the campaign is active
        const now = new Date();
        const startDate = new Date(`${campaignData.start_date}T${campaignData.start_time || '00:00'}`);
        const endDate = new Date(`${campaignData.end_date}T${campaignData.end_time || '23:59'}`);

        if (now < startDate) {
          setError("This campaign hasn't started yet");
          setLoading(false);
          return;
        }

        if (now > endDate) {
          setError("This campaign has ended");
          setLoading(false);
          return;
        }

        // Fetch questions and form fields
        const { data: questionsData, error: questionsError } = await supabase
          .from('questions')
          .select('*')
          .eq('campaign_id', id);

        if (questionsError) {
          throw questionsError;
        }

        const { data: fieldsData, error: fieldsError } = await supabase
          .from('form_fields')
          .select('*')
          .eq('campaign_id', id);

        if (fieldsError) {
          throw fieldsError;
        }

        // Set campaign with all data
        setCampaign({
          ...campaignData,
          questions: questionsData || [],
          fields: fieldsData || []
        });
      } catch (error) {
        console.error('Error loading campaign:', error);
        setError("Error loading campaign");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#841b60]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a href="/" className="px-4 py-2 bg-[#841b60] text-white rounded hover:bg-[#6d1750]">
            Go back to home
          </a>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Campaign not found</h1>
          <p className="text-gray-600 mb-6">The requested campaign could not be found.</p>
          <a href="/" className="px-4 py-2 bg-[#841b60] text-white rounded hover:bg-[#6d1750]">
            Go back to home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-6">{campaign.name}</h1>
          <p className="text-center text-gray-600 mb-8">
            This campaign preview is currently under development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicCampaign;
