
import React from 'react';

interface CampaignSettingsProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignSettings: React.FC<CampaignSettingsProps> = ({ campaign, setCampaign }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#f9f0f5] border border-[#e9d0e5] rounded-lg p-4">
        <p className="text-[#841b60] text-sm">
          Configurez les paramètres avancés de votre campagne.
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Paramètres de la campagne</h3>
        <p className="text-gray-600">Les paramètres spécifiques seront disponibles ici.</p>
      </div>
    </div>
  );
};

export default CampaignSettings;
