
import React from 'react';
import { Settings, Palette } from 'lucide-react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';
import ColorCustomizer from '../ColorCustomizer';
import JackpotBorderCustomizer from '../JackpotBorderCustomizer';
import WheelConfiguration from './WheelConfiguration';
import GamePositionSelector from './GamePositionSelector';

const ConfigurationPanel: React.FC = () => {
  const { selectedGameType } = useQuickCampaignStore();

  return (
    <div className="col-span-12 lg:col-span-5">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Settings className="w-5 h-5 mr-3 text-blue-600" />
            Configuration
          </h2>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Couleurs personnalisées */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Couleurs</h3>
            </div>
            <ColorCustomizer />
          </div>

          {/* Configuration spécifique au jackpot */}
          {selectedGameType === 'jackpot' && (
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Apparence du Jackpot</h3>
              <JackpotBorderCustomizer />
            </div>
          )}

          {/* Configuration spécifique à la roue */}
          {selectedGameType === 'wheel' && (
            <div className="pt-6 border-t border-gray-100">
              <WheelConfiguration />
            </div>
          )}

          {/* Position du jeu */}
          <div className="pt-6 border-t border-gray-100">
            <GamePositionSelector />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;
