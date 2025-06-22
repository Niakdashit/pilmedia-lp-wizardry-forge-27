
import React from 'react';
import { WizardData } from '../ModernWizard';
import { ArrowLeft, Palette, Type, Calendar, Target } from 'lucide-react';

interface AdvancedStepProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  goToStep: (stepIndex: number) => void;
}

const AdvancedStep: React.FC<AdvancedStepProps> = ({
  wizardData,
  updateWizardData,
  nextStep,
  goToStep
}) => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => goToStep(3)}
            className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Personnalisation avancée
            </h1>
            <p className="text-gray-300">
              Ajustez chaque détail de votre campagne
            </p>
          </div>
        </div>

        {/* Customization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Visual Customization */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#841b60] rounded-xl">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg">Style visuel</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-3">Couleur principale</label>
                <div className="flex space-x-3">
                  {['#841b60', '#2563eb', '#059669', '#dc2626', '#7c3aed'].map((color) => (
                    <button
                      key={color}
                      className="w-12 h-12 rounded-xl border-2 border-white/20 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-3">Style des bordures</label>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm">Arrondies</button>
                  <button className="px-4 py-2 bg-white/10 border border-white/20 rounded text-white text-sm">Droites</button>
                  <button className="px-4 py-2 bg-white/10 border border-white/20 text-white text-sm">Très arrondies</button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Customization */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#841b60] rounded-xl">
                <Type className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg">Contenu</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Titre principal</label>
                <input
                  type="text"
                  value={wizardData.generatedCampaign?.title || ''}
                  onChange={(e) => updateWizardData({
                    generatedCampaign: {
                      ...wizardData.generatedCampaign,
                      title: e.target.value
                    }
                  })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#841b60]"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Description</label>
                <textarea
                  value={wizardData.generatedCampaign?.description || ''}
                  onChange={(e) => updateWizardData({
                    generatedCampaign: {
                      ...wizardData.generatedCampaign,
                      description: e.target.value
                    }
                  })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#841b60] h-24 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Bouton d'action</label>
                <input
                  type="text"
                  value={wizardData.generatedCampaign?.cta || ''}
                  onChange={(e) => updateWizardData({
                    generatedCampaign: {
                      ...wizardData.generatedCampaign,
                      cta: e.target.value
                    }
                  })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#841b60]"
                />
              </div>
            </div>
          </div>

          {/* Campaign Settings */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#841b60] rounded-xl">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg">Planification</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Date de début</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#841b60]"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Date de fin</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#841b60]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Game Configuration */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#841b60] rounded-xl">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg">Configuration du jeu</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-3">Nombre de participants max</label>
                <div className="flex space-x-3">
                  {['100', '500', '1000', '∞'].map((limit) => (
                    <button
                      key={limit}
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm hover:bg-[#841b60] transition-colors"
                    >
                      {limit}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-3">Probabilités de gain</label>
                <input
                  type="range"
                  min="10"
                  max="90"
                  defaultValue="50"
                  className="w-full"
                />
                <div className="flex justify-between text-gray-300 text-xs mt-1">
                  <span>Rare</span>
                  <span>Fréquent</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <button
            onClick={nextStep}
            className="px-12 py-4 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#841b60]/50"
          >
            Publier ma campagne →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedStep;
