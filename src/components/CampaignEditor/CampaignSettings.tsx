
import React from 'react';
import { Settings, Target, Clock, Zap } from 'lucide-react';

interface CampaignSettingsProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignSettings: React.FC<CampaignSettingsProps> = ({ campaign, setCampaign }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-left mb-12 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-5xl font-light text-[#141E29] mb-6 leading-tight">
              Paramètres
              <span className="relative">
                <span className="bg-gradient-to-r from-[#951B6D] to-[#A020F0] bg-clip-text text-transparent font-medium"> avancés</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#951B6D] to-[#A020F0] opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl text-[#64748B] leading-relaxed font-light">
              Configurez les paramètres avancés de votre campagne pour optimiser 
              l'engagement et les conversions.
            </p>
          </div>
        </div>

        {/* Settings Cards */}
        <div className="space-y-8">
          {/* Reward Mode Card */}
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Mode de récompense</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#141E29] mb-3">
                  Mode de récompense
                </label>
                <select
                  value={campaign.rewards?.mode || 'probability'}
                  onChange={(e) => setCampaign((prev: any) => ({
                    ...prev,
                    rewards: { ...prev.rewards, mode: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                >
                  <option value="probability">Probabilité</option>
                  <option value="quantity">Quantité limitée</option>
                  <option value="timeSlots">Créneaux horaires</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#141E29] mb-3">
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
                  className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                />
              </div>
            </div>
          </div>

          {/* Advanced Settings Card */}
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Paramètres avancés</h3>
            </div>
            
            <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#F8E9F0] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-[#951B6D]" />
                </div>
                <h4 className="text-lg font-bold text-[#141E29] mb-2">Paramètres en développement</h4>
                <p className="text-[#64748B]">
                  D'autres options de configuration seront bientôt disponibles dans cette section.
                </p>
              </div>
            </div>
          </div>

          {/* Performance Settings Card */}
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Optimisation des performances</h3>
            </div>
            
            <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#F8E9F0] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#951B6D]" />
                </div>
                <h4 className="text-lg font-bold text-[#141E29] mb-2">Optimisations à venir</h4>
                <p className="text-[#64748B]">
                  Des options d'optimisation des performances et de cache seront ajoutées prochainement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignSettings;
