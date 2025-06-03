
import React from 'react';
import { X } from 'lucide-react';

interface PreviewHeaderProps {
  campaignName: string;
  selectedGameType: string;
  selectedDevice: 'desktop' | 'tablet' | 'mobile';
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
  onClose: () => void;
}

const PreviewHeader: React.FC<PreviewHeaderProps> = ({
  campaignName,
  selectedGameType,
  selectedDevice,
  onDeviceChange,
  onClose
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
          Aperçu de la campagne
        </h2>
        <span className="hidden sm:inline text-sm text-gray-500 truncate max-w-32 lg:max-w-none">
          {campaignName}
        </span>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded whitespace-nowrap">
          {selectedGameType || 'wheel'}
        </span>
        
        {/* Device selector - simplified on mobile */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onDeviceChange('desktop')}
            className={`p-1 sm:p-2 rounded-md transition-colors text-xs sm:text-sm ${
              selectedDevice === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
            }`}
          >
            <span className="hidden sm:inline">Desktop</span>
            <span className="sm:hidden">💻</span>
          </button>
          <button
            onClick={() => onDeviceChange('mobile')}
            className={`p-1 sm:p-2 rounded-md transition-colors text-xs sm:text-sm ${
              selectedDevice === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
            }`}
          >
            <span className="hidden sm:inline">Mobile</span>
            <span className="sm:hidden">📱</span>
          </button>
        </div>
      </div>

      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PreviewHeader;
