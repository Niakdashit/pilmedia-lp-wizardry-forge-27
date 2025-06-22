
import React, { useState } from 'react';
import { Eye, Monitor, Tablet, Smartphone, Play, RefreshCw } from 'lucide-react';
import GameCanvasPreview from '../../CampaignEditor/GameCanvasPreview';

interface PreviewStepProps {
  campaign: any;
  setCampaign: (updater: (prev: any) => any) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const PreviewStep: React.FC<PreviewStepProps> = ({
  campaign,
  setCampaign,
  onNext,
  onPrev
}) => {
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPlaying, setIsPlaying] = useState(false);

  const deviceIcons = {
    desktop: Monitor,
    tablet: Tablet,
    mobile: Smartphone
  };

  const deviceSizes = {
    desktop: { width: '100%', maxWidth: '800px', height: '600px' },
    tablet: { width: '100%', maxWidth: '600px', height: '500px' },
    mobile: { width: '100%', maxWidth: '375px', height: '600px' }
  };

  const handlePlayTest = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <Eye className="w-6 h-6 mr-2 text-[#841b60]" />
            Aperçu de la campagne
          </h2>
          <p className="text-gray-600">Testez votre campagne sur différents appareils</p>
        </div>

        {/* Device selector */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2 p-1 bg-gray-100 rounded-xl">
            {Object.entries(deviceIcons).map(([device, Icon]) => (
              <button
                key={device}
                onClick={() => setPreviewDevice(device as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  previewDevice === device
                    ? 'bg-white shadow-sm text-[#841b60] font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm capitalize">{device}</span>
              </button>
            ))}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handlePlayTest}
              disabled={isPlaying}
              className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
            >
              {isPlaying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              <span className="text-sm">{isPlaying ? 'Test en cours...' : 'Tester'}</span>
            </button>
          </div>
        </div>

        {/* Preview container */}
        <div className="flex justify-center">
          <div
            className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
            style={deviceSizes[previewDevice]}
          >
            <div className="h-full">
              <GameCanvasPreview
                campaign={campaign}
                gameSize={campaign.gameSize || 'medium'}
                className="w-full h-full"
                previewDevice={previewDevice}
              />
            </div>
          </div>
        </div>

        {/* Test results */}
        {isPlaying && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-medium text-blue-900 mb-2">Test en cours</h4>
            <p className="text-sm text-blue-700">
              Simulation d'une interaction utilisateur sur {previewDevice}...
            </p>
          </div>
        )}

        {/* Campaign stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900">Type de campagne</h4>
            <p className="text-sm text-gray-600 mt-1">
              {campaign.type === 'wheel' ? 'Roue de la Fortune' : campaign.type}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900">Taille du jeu</h4>
            <p className="text-sm text-gray-600 mt-1 capitalize">
              {campaign.gameSize || 'Medium'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900">Position</h4>
            <p className="text-sm text-gray-600 mt-1 capitalize">
              {campaign.gamePosition || 'Center'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button
            onClick={onPrev}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Précédent
          </button>
          <button
            onClick={onNext}
            className="px-8 py-3 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
          >
            Publier
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;
