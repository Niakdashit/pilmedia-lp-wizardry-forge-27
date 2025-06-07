import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';

export interface Participation {
  id: string;
  campaign_id: string;
  user_id?: string;
  form_data: Record<string, any>;
  user_email?: string;
  user_ip?: string;
  user_agent?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateParticipationData {
  campaign_id: string;
  form_data: Record<string, any>;
  user_email?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export const useParticipations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createParticipation = async (data: CreateParticipationData): Promise<Participation | null> => {
    setLoading(true);
    setError(null);

    try {
      const email = data.form_data.email || data.user_email;
      const userAgent = navigator.userAgent;
      
      const urlParams = new URLSearchParams(window.location.search);
      const utm_source = urlParams.get('utm_source') || data.utm_source;
      const utm_medium = urlParams.get('utm_medium') || data.utm_medium;
      const utm_campaign = urlParams.get('utm_campaign') || data.utm_campaign;

      const participationData = {
        campaign_id: data.campaign_id,
        form_data: data.form_data,
        user_email: email,
        user_agent: userAgent,
        utm_source,
        utm_medium,
        utm_campaign,
      };

      const { data: participation, error } = await supabase
        .from('participations')
        .insert(participationData)
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de la création de la participation:', error);
        setError('Erreur lors de la création de la participation');
        return null;
      }

      return participation;
    } catch (err) {
      console.error('Erreur inattendue:', err);
      setError('Une erreur inattendue s\'est produite');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getParticipationsByCampaign = async (campaignId: string): Promise<Participation[]> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('participations')
        .select('*')
        .eq('campaign_id', campaignId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erreur lors de la récupération des participations:', error);
        setError('Erreur lors de la récupération des participations');
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

  const exportParticipationsToCSV = (participations: Participation[], campaignName: string) => {
    if (participations.length === 0) {
      toast.info('Aucune participation à exporter');
      return;
    }

    const allFields = new Set<string>();
    participations.forEach(p => {
      Object.keys(p.form_data).forEach(key => allFields.add(key));
    });

    const headers = [
      'Date',
      'Email',
      'IP',
      'User Agent',
      'UTM Source',
      'UTM Medium', 
      'UTM Campaign',
      ...Array.from(allFields)
    ];

    const rows = participations.map(p => [
      new Date(p.created_at).toLocaleString('fr-FR'),
      p.user_email || '',
      p.user_ip || '',
      p.user_agent || '',
      p.utm_source || '',
      p.utm_medium || '',
      p.utm_campaign || '',
      ...Array.from(allFields).map(field => p.form_data[field] || '')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => 
        row.map(cell => 
          typeof cell === 'string' && cell.includes(',') 
            ? `"${cell.replace(/"/g, '""')}"` 
            : cell
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `participations_${campaignName}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    loading,
    error,
    createParticipation,
    getParticipationsByCampaign,
    exportParticipationsToCSV
  };
};
