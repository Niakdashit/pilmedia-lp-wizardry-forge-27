
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { FormField } from '../components/campaign/FormEditor';

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  type: string;
  form_fields?: FormField[];
  game_config?: any;
  design?: any;
  screens?: any;
  status: 'draft' | 'active' | 'paused' | 'ended';
  created_at: string;
  updated_at: string;
}

export const useCampaigns = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveCampaign = async (campaignData: Partial<Campaign>): Promise<Campaign | null> => {
    setLoading(true);
    setError(null);

    try {
      const isUpdate = !!campaignData.id;
      
      if (isUpdate) {
        const { data, error } = await supabase
          .from('campaigns')
          .update({
            name: campaignData.name,
            description: campaignData.description,
            type: campaignData.type,
            form_fields: campaignData.form_fields || [],
            game_config: campaignData.game_config,
            design: campaignData.design,
            screens: campaignData.screens,
            status: campaignData.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', campaignData.id)
          .select()
          .single();

        if (error) {
          console.error('Erreur lors de la mise à jour:', error);
          setError('Erreur lors de la mise à jour');
          return null;
        }

        return data;
      } else {
        const { data, error } = await supabase
          .from('campaigns')
          .insert({
            name: campaignData.name,
            description: campaignData.description,
            type: campaignData.type,
            form_fields: campaignData.form_fields || [],
            game_config: campaignData.game_config,
            design: campaignData.design,
            screens: campaignData.screens,
            status: campaignData.status || 'draft'
          })
          .select()
          .single();

        if (error) {
          console.error('Erreur lors de la création:', error);
          setError('Erreur lors de la création');
          return null;
        }

        return data;
      }
    } catch (err) {
      console.error('Erreur inattendue:', err);
      setError('Une erreur inattendue s\'est produite');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getCampaign = async (id: string): Promise<Campaign | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erreur lors de la récupération:', error);
        setError('Erreur lors de la récupération');
        return null;
      }

      return data;
    } catch (err) {
      console.error('Erreur inattendue:', err);
      setError('Une erreur inattendue s\'est produite');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getCampaigns = async (): Promise<Campaign[]> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération:', error);
        setError('Erreur lors de la récupération');
        return [];
      }

      return data || [];
    } catch (err) {
      console.error('Erreur inattendue:', err);
      setError('Une erreur inattendue s\'est produite');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    saveCampaign,
    getCampaign,
    getCampaigns
  };
};
