import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Campaign } from '../types';
import CampaignPreview from '../components/CampaignPreview';

const PublicCampaign: React.FC = () => {
  const { slug } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'welcome' | 'form' | 'quiz' | 'game'>('welcome');
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadCampaign = async () => {
      try {
        if (!slug) throw new Error('Campaign slug is required');

        // Create a public Supabase client without auth
        const publicSupabase = supabase;

        // First try to find by public_url
        let { data, error: campaignError } = await publicSupabase
          .from('campaigns')
          .select(`
            *,
            questions (*),
            form_fields (*)
          `)
          .eq('public_url', slug)
          .single();

        // If not found by public_url, try by id
        if (!data && !campaignError) {
          const { data: dataById, error: errorById } = await publicSupabase
            .from('campaigns')
            .select(`
              *,
              questions (*),
              form_fields (*)
            `)
            .eq('id', slug)
            .single();

          if (errorById) throw errorById;
          data = dataById;
        }

        if (!data) throw new Error('Campaign not found');

        const campaign: Campaign = {
          ...data,
          questions: data.questions || [],
          fields: data.form_fields || [],
          participants: data.participants || 0
        };

        setCampaign(campaign);
        await recordAnalytics(campaign.id, 'view');
      } catch (error) {
        console.error('Error loading campaign:', error);
        setError(error instanceof Error ? error.message : 'Campaign not found or unavailable');
      } finally {
        setLoading(false);
      }
    };

    loadCampaign();
  }, [slug]);

  const recordAnalytics = async (campaignId: string, eventType: string) => {
    try {
      const { error } = await supabase
        .from('campaign_analytics')
        .insert({
          campaign_id: campaignId,
          event_type: eventType,
          ip_address: 'client-ip'
        });

      if (error) throw error;

      if (eventType === 'participation') {
        const { error: updateError } = await supabase
          .from('campaigns')
          .update({
            participants: campaign?.participants ? campaign.participants + 1 : 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', campaignId);

        if (updateError) throw updateError;

        setCampaign(prev =>
          prev ? { ...prev, participants: (prev.participants || 0) + 1 } : null
        );
      }
    } catch (err) {
      console.error('Error recording analytics:', err);
    }
  };

  const handleParticipation = async () => {
    if (campaign) {
      await recordAnalytics(campaign.id, 'participation');
      setCurrentStep('form');
    }
  };

  const handleFormSubmit = async (formData: Record<string, string>) => {
    if (campaign) {
      try {
        const { error: participationError } = await supabase
          .from('participations')
          .insert({
            campaign_id: campaign.id,
            ...formData,
            reglement_accepte: true
          });

        if (participationError) throw participationError;

        await recordAnalytics(campaign.id, 'form_submission');
        
        // Always go to quiz step if there are questions, otherwise go to game
        setCurrentStep(campaign.questions && campaign.questions.length > 0 ? 'quiz' : 'game');
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleGameComplete = async () => {
    if (campaign) {
      await recordAnalytics(campaign.id, 'completion');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#841b60]"></div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Campaign Not Found</h1>
          <p className="text-gray-600">The campaign you're looking for doesn't exist or is no longer available.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ 
        backgroundImage: `url(${campaign.background_image || 'https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg'})` 
      }}
    >
      <div className="max-w-[800px] w-full">
        <CampaignPreview
          campaign={campaign}
          currentStep="questions"
          onParticipate={handleParticipate}
          onFormSubmit={handleFormSubmit}
          onGameComplete={handleGameComplete}
        />
      </div>
    </div>
  );
};

export default PublicCampaign;
