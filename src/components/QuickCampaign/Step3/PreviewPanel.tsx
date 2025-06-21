
import React, { useState } from 'react';
import { Eye, Monitor, Smartphone, Tablet, RotateCcw } from 'lucide-react';
import PreviewContent from '../Preview/PreviewContent';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

const PreviewPanel: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const { 
    selectedGameType, 
    customColors, 
    jackpotColors, 
    generatePreviewCampaign,
    reset 
  } = useQuickCampaignStore();

  const mockCampaign = generatePreviewCampaign();

  const devices = [
    { id: 'desktop' as const, icon: Monitor, label: 'Desktop' },
    { id: 'tablet' as const, icon: Tablet, label: 'Tablette' },
    { id: 'mobile' as const, icon: Smartphone, label: 'Mobile' }
  ];

  return (
    <div className="col-span-7 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-100 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Aperçu en temps réel</h2>
              <p className="text-sm text-gray-600">Visualisez votre campagne</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Device Selector */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {devices.map((device) => {
                const Icon = device.icon;
                return (
                  <button
                    key={device.id}
                    onClick={() => setSelectedDevice(device.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
                      selectedDevice === device.id
                        ? 'bg-white shadow-sm text-blue-600 font-medium'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm">{device.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Reset Button */}
            <button
              onClick={reset}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Réinitialiser"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="h-[calc(100vh-20rem)] bg-gray-50">
        {selectedGameType ? (
          <PreviewContent
            selectedDevice={selectedDevice}
            mockCampaign={mockCampaign}
            selectedGameType={selectedGameType}
            customColors={customColors}
            jackpotColors={jackpotColors}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                <Eye className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">Aucun jeu sélectionné</p>
                <p className="text-sm text-gray-600">Veuillez d'abord choisir un type de jeu</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
