
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import ColorCustomizer from './ColorCustomizer';
import JackpotBorderCustomizer from './JackpotBorderCustomizer';
import PreviewWindowButton from '../common/PreviewWindowButton';
import PreviewContent from './Preview/PreviewContent';

const Step3VisualStyle: React.FC = () => {
  const {
    selectedGameType,
    segmentCount,
    setSegmentCount,
    gamePosition,
    setGamePosition,
    setCurrentStep,
    generatePreviewCampaign,
    campaignName,
    customColors,
    jackpotColors
  } = useQuickCampaignStore();

  const mockCampaign = generatePreviewCampaign();

  return (
    <div className="min-h-screen bg-[#ebf4f7] flex">
      {/* Panel de configuration - côté gauche */}
      <div className="w-1/2 p-8 bg-white border-r border-gray-200">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Style et Personnalisation
            </h1>
            <p className="text-gray-600">
              Personnalisez l'apparence de votre campagne {selectedGameType}
            </p>
          </div>

          <div className="space-y-8">
            {/* Couleurs personnalisées */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Couleurs</h3>
              <ColorCustomizer />
            </div>

            {/* Configuration spécifique au jackpot */}
            {selectedGameType === 'jackpot' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Apparence du Jackpot</h3>
                <JackpotBorderCustomizer />
              </div>
            )}

            {/* Configuration spécifique à la roue */}
            {selectedGameType === 'wheel' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuration de la roue</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de segments: {segmentCount}
                    </label>
                    <input
                      type="range"
                      min="4"
                      max="12"
                      value={segmentCount}
                      onChange={(e) => setSegmentCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>4</span>
                      <span>12</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Position du jeu */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Position du jeu</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'top', label: 'Haut' },
                  { value: 'center', label: 'Centre' },
                  { value: 'bottom', label: 'Bas' },
                  { value: 'left', label: 'Gauche' },
                  { value: 'right', label: 'Droite' }
                ].map((position) => (
                  <button
                    key={position.value}
                    onClick={() => setGamePosition(position.value as any)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                      gamePosition === position.value
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {position.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Boutons de navigation */}
          <div className="flex justify-between mt-12">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </button>

            <PreviewWindowButton
              campaign={mockCampaign}
              title={`Aperçu - ${campaignName}`}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Voir l'aperçu final
            </PreviewWindowButton>
          </div>
        </div>
      </div>

      {/* Panel d'aperçu - côté droit */}
      <div className="w-1/2 p-8 bg-gray-50">
        <div className="h-full flex flex-col">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Aperçu en temps réel</h2>
            <p className="text-gray-600 text-sm">Les modifications apparaissent instantanément</p>
          </div>
          
          <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
            <PreviewContent
              selectedDevice="desktop"
              mockCampaign={mockCampaign}
              selectedGameType={selectedGameType || 'wheel'}
              customColors={customColors}
              jackpotColors={jackpotColors}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3VisualStyle;
