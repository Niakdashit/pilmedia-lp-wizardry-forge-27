import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

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
}

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*');

      if (error) {
        setError(error);
      } else {
        setCampaigns(data || []);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCampaign = async (id: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError(error);
        console.error('Error fetching campaign:', error);
      }

      return data;
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
        const { data, error } = await supabase
          .from('campaigns')
          .update(campaignToSave)
          .eq('id', campaignToSave.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        delete campaignToSave.id;
        const { data, error } = await supabase
          .from('campaigns')
          .insert([campaignToSave])
          .select()
          .single();

        if (error) throw error;
        return data;
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
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);

      if (error) {
        setError(error);
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
