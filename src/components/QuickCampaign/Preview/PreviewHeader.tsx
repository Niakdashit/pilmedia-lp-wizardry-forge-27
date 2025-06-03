
import React from 'react';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import DeviceSelector from './DeviceSelector';

interface PreviewHeaderProps {
  campaignName: string;
  selectedGameType: string;
  selectedDevice: 'desktop' | 'tablet' | 'mobile';
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
  onClose: () => void;
}

const gameTypeLabels: Record<string, string> = {
  wheel: 'Roue de la Fortune',
  jackpot: 'Machine à sous',
  scratch: 'Carte à gratter',
  dice: 'Lancé de dés',
  quiz: 'Quiz interactif'
};

const PreviewHeader: React.FC<PreviewHeaderProps> = ({
  campaignName,
  selectedGameType,
  selectedDevice,
  onDeviceChange,
  onClose
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between relative z-20 shrink-0">
      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
            Aperçu - {campaignName}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {gameTypeLabels[selectedGameType] || selectedGameType}
          </p>
        </div>
        
        <div className="flex items-center bg-gray-100 rounded-lg p-1 shrink-0">
          <button
            onClick={() => onDeviceChange('desktop')}
            className={`p-1.5 sm:p-2 rounded-md transition-colors ${
              selectedDevice === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
            }`}
            title="Desktop"
          >
            <Monitor className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => onDeviceChange('tablet')}
            className={`p-1.5 sm:p-2 rounded-md transition-colors ${
              selectedDevice === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
            }`}
            title="Tablette"
          >
            <Tablet className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => onDeviceChange('mobile')}
            className={`p-1.5 sm:p-2 rounded-md transition-colors ${
              selectedDevice === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
            }`}
            title="Mobile"
          >
            <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
      
      <button
        onClick={onClose}
        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors ml-2 sm:ml-4 shrink-0"
        title="Fermer"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

export default PreviewHeader;
