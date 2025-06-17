
import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import ColorCustomizer from './ColorCustomizer';
import JackpotBorderCustomizer from './JackpotBorderCustomizer';
import PreviewWindowButton from '../common/PreviewWindowButton';

const Step3VisualStyle: React.FC = () => {
  const {
    selectedGameType,
    customColors,
    setCustomColors,
    jackpotColors,
    setJackpotColors,
    backgroundImageUrl,
    setBackgroundImage,
    setBackgroundImageUrl,
    segmentCount,
    setSegmentCount,
    gamePosition,
    setGamePosition,
    setCurrentStep,
    generatePreviewCampaign,
    campaignName
  } = useQuickCampaignStore();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (backgroundImageUrl) {
        URL.revokeObjectURL(backgroundImageUrl);
      }
      
      const url = URL.createObjectURL(file);
      setBackgroundImage(file);
      setBackgroundImageUrl(url);
    }
  };

  const removeBackgroundImage = () => {
    if (backgroundImageUrl) {
      URL.revokeObjectURL(backgroundImageUrl);
    }
    setBackgroundImage(null);
    setBackgroundImageUrl(null);
  };

  useEffect(() => {
    return () => {
      if (backgroundImageUrl) {
        URL.revokeObjectURL(backgroundImageUrl);
      }
    };
  }, [backgroundImageUrl]);

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

            {/* Image de fond */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Image de fond</h3>
              <div className="space-y-4">
                {!backgroundImageUrl ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="background-upload"
                    />
                    <label htmlFor="background-upload" className="cursor-pointer">
                      <div className="text-gray-400 mb-2">
                        <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">
                        Cliquez pour ajouter une image de fond
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={backgroundImageUrl}
                      alt="Aperçu de l'image de fond"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={removeBackgroundImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
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
          
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {selectedGameType?.toUpperCase().slice(0, 2)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{campaignName}</h3>
              <p className="text-gray-600 text-sm mb-4">Type: {selectedGameType}</p>
              <div className="space-y-2">
                <div className="w-32 h-2 bg-gray-200 rounded mx-auto"></div>
                <div className="w-24 h-2 bg-gray-200 rounded mx-auto"></div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Cliquez sur "Voir l'aperçu final" pour une vue complète
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3VisualStyle;
