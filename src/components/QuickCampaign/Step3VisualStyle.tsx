
import React from 'react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import ColorCustomizer from './ColorCustomizer';
import JackpotBorderCustomizer from './JackpotBorderCustomizer';
import GameRenderer from './Preview/GameRenderer';

const Step3VisualStyle: React.FC = () => {
  const {
    currentStep,
    setCurrentStep,
    selectedGameType,
    customColors,
    jackpotColors,
    setCustomColors,
    setJackpotColors,
    generatePreviewCampaign
  } = useQuickCampaignStore();

  const mockCampaign = generatePreviewCampaign();

  const handleNext = () => {
    setCurrentStep(4);
  };

  const handlePrevious = () => {
    setCurrentStep(2);
  };

  const handleReset = () => {
    setCustomColors({
      primary: '#3B82F6',
      secondary: '#E3F2FD',
      accent: '#1E40AF'
    });
    setJackpotColors({
      containerBackgroundColor: '#1f2937',
      backgroundColor: '#3B82F6',
      borderColor: '#1E40AF',
      borderWidth: 3,
      slotBorderColor: '#60A5FA',
      slotBorderWidth: 2,
      slotBackgroundColor: '#ffffff'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* En-tête */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Style visuel</h2>
        <p className="text-gray-600">Personnalisez l'apparence de votre expérience</p>
      </div>

      {/* Aperçu de la roue - Repositionné ici */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Aperçu en temps réel</h3>
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
        
        <div className="flex justify-center items-center min-h-[400px] bg-gray-50 rounded-lg">
          {selectedGameType && (
            <GameRenderer
              gameType={selectedGameType}
              mockCampaign={mockCampaign}
              customColors={customColors}
              jackpotColors={jackpotColors}
              gameSize="large"
              gamePosition="center"
              previewDevice="desktop"
            />
          )}
        </div>
      </div>

      {/* Customisateurs de couleurs */}
      <div className="space-y-6">
        <ColorCustomizer />
        
        {selectedGameType === 'jackpot' && (
          <JackpotBorderCustomizer />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <button
          onClick={handlePrevious}
          className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Précédent</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors"
        >
          <span>Suivant</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Step3VisualStyle;
