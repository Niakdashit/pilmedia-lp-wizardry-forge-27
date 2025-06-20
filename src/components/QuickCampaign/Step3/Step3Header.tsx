
import React from 'react';
import { ArrowLeft, Eye } from 'lucide-react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';
import PreviewWindowButton from '../../common/PreviewWindowButton';

const Step3Header: React.FC = () => {
  const {
    selectedGameType,
    setCurrentStep,
    generatePreviewCampaign,
    campaignName,
    advancedMode,
    setAdvancedMode
  } = useQuickCampaignStore();

  const mockCampaign = React.useMemo(
    () => generatePreviewCampaign(),
    [generatePreviewCampaign]
  );

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
        </div>
      </div>
    </div>
  );
};

export default Step3Header;
