
import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Play, RotateCcw } from 'lucide-react';
import FunnelUnlockedGame from '../../../funnels/FunnelUnlockedGame';
import FunnelStandard from '../../../funnels/FunnelStandard';

interface PreviewTabProps {
  campaign: any;
}

const PreviewTab: React.FC<PreviewTabProps> = ({ campaign }) => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPlaying, setIsPlaying] = useState(false);

  const devices = [
    { id: 'desktop', label: 'Desktop', icon: Monitor, width: '100%', height: '600px' },
    { id: 'tablet', label: 'Tablette', icon: Tablet, width: '768px', height: '1024px' },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, width: '375px', height: '667px' }
  ];

  const renderPreview = () => {
    const mobileConfig = selectedDevice !== 'desktop' ? campaign.mobileConfig : undefined;
    
    if (['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type)) {
      return (
        <FunnelUnlockedGame
          campaign={campaign}
          modalContained={true}
          mobileConfig={mobileConfig}
        />
      );
    }
    
    return <FunnelStandard campaign={campaign} />;
  };

  const currentDevice = devices.find(d => d.id === selectedDevice);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Prévisualisation finale</h2>
        
        {/* Device Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
            {devices.map((device) => {
              const Icon = device.icon;
              return (
                <button
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedDevice === device.id
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{device.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>{isPlaying ? 'Pause' : 'Tester'}</span>
            </button>
            
            <button
              onClick={() => setIsPlaying(false)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Preview Frame */}
        <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
          <div
            style={{
              width: currentDevice?.width,
              height: currentDevice?.height,
              maxWidth: '100%',
              maxHeight: '80vh'
            }}
            className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 relative"
          >
            {/* Device Frame */}
            {selectedDevice !== 'desktop' && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-400 rounded-full"></div>
            )}
            
            {/* Content */}
            <div className="w-full h-full overflow-auto">
              {renderPreview()}
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Informations sur la prévisualisation</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• Appareil sélectionné : {currentDevice?.label}</p>
            <p>• Résolution : {currentDevice?.width} × {currentDevice?.height}</p>
            <p>• Type de jeu : {campaign.type}</p>
            <p>• Statut : {campaign.status === 'active' ? 'Actif' : 'Brouillon'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewTab;
