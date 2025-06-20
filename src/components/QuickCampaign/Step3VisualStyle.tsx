
import React from 'react';
import { ArrowLeft, Palette, Settings, Eye } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Style et Personnalisation
              </h1>
              <p className="text-gray-600">
                Personnalisez l'apparence de votre campagne {selectedGameType}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center px-4 py-2 text-gray-600 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </button>
              <PreviewWindowButton
                campaign={mockCampaign}
                title={`Aperçu - ${campaignName}`}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-200"
              >
                <Eye className="w-4 h-4 mr-2" />
                Aperçu final
              </PreviewWindowButton>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Panel de configuration */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Settings className="w-5 h-5 mr-3 text-blue-600" />
                  Configuration
                </h2>
              </div>
              
              <div className="p-6 space-y-8">
                {/* Couleurs personnalisées */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Palette className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Couleurs</h3>
                  </div>
                  <ColorCustomizer />
                </div>

                {/* Configuration spécifique au jackpot */}
                {selectedGameType === 'jackpot' && (
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Apparence du Jackpot</h3>
                    <JackpotBorderCustomizer />
                  </div>
                )}

                {/* Configuration spécifique à la roue */}
                {selectedGameType === 'wheel' && (
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration de la roue</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Nombre de segments: <span className="text-blue-600 font-semibold">{segmentCount}</span>
                        </label>
                        <input
                          type="range"
                          min="4"
                          max="12"
                          value={segmentCount}
                          onChange={(e) => setSegmentCount(parseInt(e.target.value))}
                          className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>4 segments</span>
                          <span>12 segments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Position du jeu */}
                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Position du jeu</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'top', label: 'Haut', icon: '⬆️' },
                      { value: 'center', label: 'Centre', icon: '⚫' },
                      { value: 'bottom', label: 'Bas', icon: '⬇️' },
                      { value: 'left', label: 'Gauche', icon: '⬅️' },
                      { value: 'right', label: 'Droite', icon: '➡️' }
                    ].map((position) => (
                      <button
                        key={position.value}
                        onClick={() => setGamePosition(position.value as any)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                          gamePosition === position.value
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-500 text-blue-700 shadow-md'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-2xl mb-1">{position.icon}</span>
                        <span className="text-sm font-medium">{position.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel d'aperçu */}
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-full">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Eye className="w-5 h-5 mr-3 text-green-600" />
                    Aperçu en temps réel
                  </h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-500">Mise à jour automatique</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 h-[600px]">
                <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border border-gray-200">
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
        </div>

        {/* Progress Indicator */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">Étape 1</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-600">Étape 2</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-blue-600">Étape 3</span>
            </div>
          </div>
          <p className="text-gray-500 font-light">Finalisation de votre campagne</p>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3B82F6, #8B5CF6);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #3B82F6, #8B5CF6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default Step3VisualStyle;
