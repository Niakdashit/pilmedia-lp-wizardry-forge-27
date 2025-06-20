
import React, { useState } from 'react';
import { Eye, Monitor, Tablet, Smartphone } from 'lucide-react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';
import PreviewContent from '../Preview/PreviewContent';

const PreviewPanel: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const {
    selectedGameType,
    generatePreviewCampaign,
    customColors,
    jackpotColors
  } = useQuickCampaignStore();

  const mockCampaign = generatePreviewCampaign();

  const deviceOptions = [
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'tablet', label: 'Tablette', icon: Tablet },
    { id: 'mobile', label: 'Mobile', icon: Smartphone }
  ];

  return (
    <div className="col-span-12 lg:col-span-7">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-full">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Eye className="w-5 h-5 mr-3 text-green-600" />
              Aperçu en temps réel
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Mise à jour automatique</span>
              </div>
              
              {/* Sélecteur d'appareil */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                {deviceOptions.map((device) => {
                  const IconComponent = device.icon;
                  return (
                    <button
                      key={device.id}
                      onClick={() => setSelectedDevice(device.id as 'desktop' | 'tablet' | 'mobile')}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedDevice === device.id
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{device.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Container adaptatif selon l'appareil */}
          <div
            className={`w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 relative p-4 overflow-visible ${
              selectedDevice === 'desktop' ? 'h-[500px]' : 'min-h-[620px]'
            }`}
          >
            {/* Barre de navigation pour desktop */}
            {selectedDevice === 'desktop' && (
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
            )}
            
            {/* Contenu de l'aperçu */}
            <div className={selectedDevice === 'desktop' ? 'h-[calc(100%-40px)] relative' : 'h-full relative'}>
              <PreviewContent
                selectedDevice={selectedDevice}
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
