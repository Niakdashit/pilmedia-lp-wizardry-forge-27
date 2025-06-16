
import React, { useState } from 'react';
import { X, Monitor, Smartphone, Tablet } from 'lucide-react';

interface ModernPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const ModernPreviewModal: React.FC<ModernPreviewModalProps> = ({
  isOpen,
  onClose,
  campaign
}) => {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!isOpen) return null;

  const getDeviceStyles = () => {
    switch (device) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { width: '1200px', height: '800px' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-[95vw] max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">Aperçu - {campaign.name}</h2>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setDevice('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('tablet')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDevice('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  device === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 p-8 bg-gray-100 flex items-center justify-center">
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            style={getDeviceStyles()}
          >
            <div
              className="h-full p-6 flex flex-col items-center justify-center"
              style={{
                backgroundColor: campaign.design?.background || '#f8fafc',
                fontFamily: campaign.design?.fontFamily || 'Inter'
              }}
            >
              <div className="text-center space-y-4">
                <h1
                  className="text-3xl font-bold"
                  style={{ color: campaign.design?.titleColor || '#000000' }}
                >
                  {campaign.screens?.[1]?.title || 'Bienvenue !'}
                </h1>
                <p className="text-lg text-gray-600">
                  {campaign.screens?.[1]?.description || 'Participez à notre jeu et tentez de gagner !'}
                </p>
                <button
                  className="px-8 py-3 rounded-lg text-white font-medium text-lg"
                  style={{ backgroundColor: campaign.design?.buttonColor || '#841b60' }}
                >
                  {campaign.screens?.[1]?.buttonText || 'Participer'}
                </button>
              </div>

              {/* Game Preview Area */}
              <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center text-gray-500">
                  <div className="text-lg font-medium">Jeu : {campaign.type}</div>
                  <div className="text-sm mt-2">Position : {campaign.gamePosition || 'center'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernPreviewModal;
