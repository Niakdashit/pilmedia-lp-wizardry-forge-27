
import React from 'react';
import { Eye } from 'lucide-react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';
import PreviewContent from '../Preview/PreviewContent';

const PreviewPanel: React.FC = () => {
  const {
    selectedGameType,
    generatePreviewCampaign,
    customColors,
    jackpotColors
  } = useQuickCampaignStore();

  const mockCampaign = generatePreviewCampaign();

  return (
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
        
        <div className="p-6">
          {/* Container en mode paysage comme une vraie page web */}
          <div className="w-full h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border border-gray-200 relative">
            {/* Simuler une barre de navigation de navigateur */}
            <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 bg-gray-100 rounded px-3 py-1 text-xs text-gray-600">
                campaign.leadya.com
              </div>
            </div>
            
            {/* Contenu de la page web en plein écran */}
            <div className="h-[calc(100%-40px)] relative">
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
  );
};

export default PreviewPanel;
