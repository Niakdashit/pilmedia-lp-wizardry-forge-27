
import React from 'react';
import { WizardData } from '../ModernWizard';
import { Palette, Type, Target, Calendar } from 'lucide-react';

interface AdvancedStepProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const AdvancedStep: React.FC<AdvancedStepProps> = ({
  wizardData,
  updateWizardData,
  nextStep,
  prevStep
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#141e29] mb-3">
            Personnalisation avancée
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            Ajustez chaque détail de votre campagne selon vos préférences avec des contrôles visuels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Visual Customization */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-[#951b6d]/10 rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-[#951b6d]" />
              </div>
              <h3 className="font-semibold text-[#141e29]">Style visuel</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[#141e29] text-sm font-medium mb-3">Couleur principale</label>
                <div className="flex space-x-3">
                  {['#951b6d', '#2563eb', '#059669', '#dc2626', '#7c3aed'].map((color) => (
                    <button
                      key={color}
                      className="w-12 h-12 rounded-xl border-2 border-gray-200 hover:scale-110 transition-all duration-200 shadow-sm hover:shadow-md"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-[#141e29] text-sm font-medium mb-3">Style des éléments</label>
                <div className="flex space-x-3">
                  {['Moderne', 'Classique', 'Ludique'].map((style) => (
                    <button
                      key={style}
                      className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm hover:bg-[#951b6d]/10 hover:text-[#951b6d] hover:border-[#951b6d]/30 transition-all"
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Customization */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-[#951b6d]/10 rounded-lg flex items-center justify-center">
                <Type className="w-4 h-4 text-[#951b6d]" />
              </div>
              <h3 className="font-semibold text-[#141e29]">Contenu</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#141e29] text-sm font-medium mb-2">Titre principal</label>
                <input
                  type="text"
                  value={wizardData.generatedCampaign?.title || ''}
                  onChange={(e) => updateWizardData({
                    generatedCampaign: {
                      ...wizardData.generatedCampaign,
                      title: e.target.value
                    }
                  })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-[#141e29] focus:outline-none focus:ring-2 focus:ring-[#951b6d]/20 focus:border-[#951b6d]/30 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-[#141e29] text-sm font-medium mb-2">Description</label>
                <textarea
                  value={wizardData.generatedCampaign?.description || ''}
                  onChange={(e) => updateWizardData({
                    generatedCampaign: {
                      ...wizardData.generatedCampaign,
                      description: e.target.value
                    }
                  })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-[#141e29] focus:outline-none focus:ring-2 focus:ring-[#951b6d]/20 focus:border-[#951b6d]/30 h-24 resize-none transition-all"
                />
              </div>
              
              <div>
                <label className="block text-[#141e29] text-sm font-medium mb-2">Bouton d'action</label>
                <input
                  type="text"
                  value={wizardData.generatedCampaign?.cta || ''}
                  onChange={(e) => updateWizardData({
                    generatedCampaign: {
                      ...wizardData.generatedCampaign,
                      cta: e.target.value
                    }
                  })}
                  className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-[#141e29] focus:outline-none focus:ring-2 focus:ring-[#951b6d]/20 focus:border-[#951b6d]/30 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Game Configuration */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-[#951b6d]/10 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-[#951b6d]" />
              </div>
              <h3 className="font-semibold text-[#141e29]">Configuration du jeu</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[#141e29] text-sm font-medium mb-3">Participants maximum</label>
                <div className="flex space-x-3">
                  {['100', '500', '1000', '∞'].map((limit) => (
                    <button
                      key={limit}
                      className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm hover:bg-[#951b6d] hover:text-white hover:border-[#951b6d] transition-all"
                    >
                      {limit}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-[#141e29] text-sm font-medium mb-3">Probabilités de gain</label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="10"
                    max="90"
                    defaultValue="50"
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-gray-500 text-xs">
                    <span>Rare (10%)</span>
                    <span>Équilibré (50%)</span>
                    <span>Fréquent (90%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Settings */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-[#951b6d]/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[#951b6d]" />
              </div>
              <h3 className="font-semibold text-[#141e29]">Planification</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#141e29] text-sm font-medium mb-2">Début</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-[#141e29] focus:outline-none focus:ring-2 focus:ring-[#951b6d]/20 focus:border-[#951b6d]/30 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#141e29] text-sm font-medium mb-2">Fin</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl text-[#141e29] focus:outline-none focus:ring-2 focus:ring-[#951b6d]/20 focus:border-[#951b6d]/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#141e29] text-sm font-medium mb-3">Diffusion automatique</label>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-[#951b6d] text-white rounded-xl text-sm font-medium">
                    Activée
                  </button>
                  <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-sm border border-gray-200 hover:bg-gray-100 transition-all">
                    Désactivée
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 hover:scale-105"
          >
            Retour à l'aperçu
          </button>
          <button
            onClick={nextStep}
            className="px-8 py-3 bg-[#951b6d] text-white font-semibold rounded-xl hover:bg-[#7d1659] transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Publier ma campagne
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedStep;
