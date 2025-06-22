
import { useState } from 'react';

interface Participation {
  campaign_id: string;
  form_data: Record<string, string>;
  user_email: string;
  created_at?: string;
}

export const useParticipations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createParticipation = async (participation: Participation): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log('Participation created:', {
        ...participation,
        created_at: new Date().toISOString()
      });
      
      return true;
    } catch (err) {
      setError('Erreur lors de l\'enregistrement de la participation');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getParticipations = async (campaignId: string): Promise<Participation[]> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return mock data
      return [];
    } catch (err) {
      setError('Erreur lors du chargement des participations');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    createParticipation,
    getParticipations,
    loading,
    error
  };
};
