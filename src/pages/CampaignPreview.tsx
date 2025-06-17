
import { useState } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft } from 'lucide-react';
import { useQuickCampaignStore } from '../stores/quickCampaignStore';
import PreviewContent from '../components/QuickCampaign/Preview/PreviewContent';
import DeviceSelector from '../components/QuickCampaign/Preview/DeviceSelector';

const CampaignPreview: FC = () => {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  const { generatePreviewCampaign, campaignName, selectedGameType, customColors, jackpotColors } = useQuickCampaignStore();

  // Récupérer les données de la campagne depuis les paramètres URL ou le store
  const mockCampaign = generatePreviewCampaign();

  const handleBack = () => {
    navigate('/quick-campaign');
  };

  const handleClose = () => {
    navigate('/quick-campaign');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header fixe */}
      <div className="bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Retour</span>
              </button>
              
              <div className="h-6 w-px bg-gray-300" />
              
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Aperçu de la campagne</h1>
                <p className="text-sm text-gray-500">{campaignName}</p>
              </div>
              
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {selectedGameType || 'wheel'}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <DeviceSelector
                selectedDevice={selectedDevice}
                onDeviceChange={setSelectedDevice}
              />
              
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu de l'aperçu - prend tout l'espace restant */}
      <div className="flex-1 overflow-hidden">
        <PreviewContent
          selectedDevice={selectedDevice}
          mockCampaign={mockCampaign}
          selectedGameType={selectedGameType || 'wheel'}
          customColors={customColors}
          jackpotColors={jackpotColors}
        />
      </div>
    </div>
  );
};

export default CampaignPreview;
