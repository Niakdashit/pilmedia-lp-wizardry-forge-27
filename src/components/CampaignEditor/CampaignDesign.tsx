
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Campaign } from '../../types/campaign';

interface CampaignDesignProps {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign>>;
}

const CampaignDesign: React.FC<CampaignDesignProps> = ({ campaign, setCampaign }) => {
  return (
    <div className="p-6 bg-yellow-50 rounded-lg">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-yellow-800 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-yellow-800 font-medium">Fonctionnalités déplacées</h3>
          <p className="mt-1 text-yellow-700">
            Les outils de personnalisation du design ont été déplacés dans l'onglet "Écrans" 
            pour une meilleure expérience utilisateur. Vous pouvez y accéder en cliquant sur 
            l'onglet "Écrans" ci-dessus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignDesign;
