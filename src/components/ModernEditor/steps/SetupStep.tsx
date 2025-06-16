
import React from 'react';
import BrandAssetsCard from '../BrandAssetsCard';

interface SetupStepProps {
  campaign: any;
  setCampaign: (updater: (prev: any) => any) => void;
}

const SetupStep: React.FC<SetupStepProps> = ({ campaign, setCampaign }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-[#841b60]/20 pb-2">
          Configuration de base
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de la campagne
              </label>
              <input
                type="text"
                value={campaign.name}
                onChange={(e) => setCampaign((prev: any) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-[#841b60] focus:bg-white transition-all"
                placeholder="Ma super campagne..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={campaign.description}
                onChange={(e) => setCampaign((prev: any) => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-[#841b60] focus:bg-white transition-all resize-none"
                placeholder="Décrivez l'objectif de votre campagne..."
              />
            </div>
          </div>
          
          <BrandAssetsCard campaign={campaign} setCampaign={setCampaign} />
        </div>
      </div>
    </div>
  );
};

export default SetupStep;
