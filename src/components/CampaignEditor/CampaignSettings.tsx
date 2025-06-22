
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mode de récompense
            </label>
            <select
              value={campaign.rewards?.mode || 'probability'}
              onChange={(e) => setCampaign((prev: any) => ({
                ...prev,
                rewards: { ...prev.rewards, mode: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            >
              <option value="probability">Probabilité</option>
              <option value="quantity">Quantité limitée</option>
              <option value="timeSlots">Créneaux horaires</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Probabilité de gain (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={campaign.rewards?.probability || 10}
              onChange={(e) => setCampaign((prev: any) => ({
                ...prev,
                rewards: { ...prev.rewards, probability: Number(e.target.value) }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#841b60]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignSettings;
