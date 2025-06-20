
import React, { useState } from 'react';
import { ArrowLeft, Eye, Code } from 'lucide-react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';
import PreviewWindowButton from '../../common/PreviewWindowButton';
import EmbedCodeModal from '../../common/EmbedCodeModal';

const Step3Header: React.FC = () => {
  const {
    selectedGameType,
    setCurrentStep,
    generatePreviewCampaign,
    campaignName,
    advancedMode,
    setAdvancedMode,
    simulateWins
  } = useQuickCampaignStore();

  const [simulation, setSimulation] = useState<{ wins: number; losses: number } | null>(null);
  const [showEmbed, setShowEmbed] = useState(false);

  const mockCampaign = generatePreviewCampaign();

  return (
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
          <label className="flex items-center space-x-2 mr-4">
            <input
              type="checkbox"
              checked={advancedMode}
              onChange={(e) => setAdvancedMode(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Mode Expert</span>
          </label>
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
          <button
            onClick={() => setSimulation(simulateWins(100, 0.1))}
            className="px-4 py-2 bg-green-600 text-white rounded-xl shadow"
          >
            Simuler 100 tours
          </button>
          <button
            onClick={() => setShowEmbed(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow flex items-center"
          >
            <Code className="w-4 h-4 mr-2" />
            Code d'intégration
          </button>
        </div>
      </div>
      {simulation && (
        <p className="mt-2 text-sm text-gray-600">
          Résultat simulation: {simulation.wins} gains / {simulation.losses} pertes
        </p>
      )}
      {showEmbed && (
        <EmbedCodeModal campaignId={mockCampaign.id} onClose={() => setShowEmbed(false)} />
      )}
    </div>
  );
};

export default Step3Header;
