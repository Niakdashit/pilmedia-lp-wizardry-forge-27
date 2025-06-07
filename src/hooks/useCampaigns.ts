
import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface Campaign {
  id?: string;
  name: string;
  description: string;
  url: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: 'draft' | 'active' | 'inactive';
  type: string;
  formFields: any[];
  gameConfig: any;
  design?: any;
  mobileConfig?: any;
  freeTextZones?: any[];
  form_fields?: any[];
  free_text_zones?: any[];
}

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const result = await supabase
        .from('campaigns')
        .select('*');

      if (result.error) {
        setError(result.error);
      } else {
        setCampaigns(result.data || []);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCampaign = async (id: string): Promise<Campaign | null> => {
    setIsLoading(true);
    try {
      // For mock, return a default campaign structure
      const mockCampaign: Campaign = {
        id,
        name: 'Campaign Test',
        description: 'Test campaign',
        url: 'test-campaign',
        startDate: '2025-01-01',
        startTime: '09:00',
        endDate: '2025-12-31',
        endTime: '18:00',
        status: 'draft',
        type: 'wheel',
        formFields: [],
        gameConfig: {},
        design: {},
        mobileConfig: {},
        freeTextZones: [],
        form_fields: [],
        free_text_zones: []
      };

      return mockCampaign;
    } catch (err: any) {
      setError(err);
      console.error('Error fetching campaign:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const saveCampaign = async (campaignData: any) => {
    setIsLoading(true);
    try {
      const campaignToSave = {
        ...campaignData,
        form_fields: campaignData.formFields || campaignData.form_fields,
        free_text_zones: campaignData.freeTextZones || campaignData.free_text_zones || []
      };

      if (campaignToSave.id) {
        const result = await supabase
          .from('campaigns')
          .update(campaignToSave)
          .eq('id', campaignToSave.id)
          .select()
          .single();

        if (result.error) throw result.error;
        return result.data;
      } else {
        delete campaignToSave.id;
        const result = await supabase
          .from('campaigns')
          .insert([campaignToSave])
          .select()
          .single();

        if (result.error) throw result.error;
        return result.data;
      }
    } catch (error) {
      console.error('Error saving campaign:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCampaign = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);

      if (result.error) {
        setError(result.error);
      } else {
        setCampaigns(campaigns.filter(campaign => campaign.id !== id));
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    campaigns,
    isLoading,
    error,
    fetchCampaigns,
    getCampaign,
    saveCampaign,
    deleteCampaign,
  };
};
