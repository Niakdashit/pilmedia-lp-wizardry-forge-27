
import React from 'react';
import { Settings, Palette, Crown, Puzzle } from 'lucide-react';
import AdvancedModeToggle from './AdvancedModeToggle';
import WheelConfiguration from './WheelConfiguration';
import GamePositionSelector from './GamePositionSelector';
import ButtonStyleSelector from './ButtonStyleSelector';
import AdvancedWheelCustomization from './AdvancedWheelCustomization';
import CustomPointerUpload from './CustomPointerUpload';
import WheelCenterCustomization from './WheelCenterCustomization';
import SegmentOverlayCustomization from './SegmentOverlayCustomization';
import WheelRenderingEffects from './WheelRenderingEffects';
import MonetizationFeatures from './MonetizationFeatures';
import ProExtensions from './ProExtensions';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

const ConfigurationPanel: React.FC = () => {
  const { advancedMode, selectedGameType } = useQuickCampaignStore();

  return (
    <div className="col-span-12 lg:col-span-5">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-full">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Configuration</h2>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="space-y-8">
            {/* Mode Toggle */}
            <AdvancedModeToggle />
            
            {/* Basic Configuration */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Configuration de base</h3>
              </div>
              
              {selectedGameType === 'wheel' && <WheelConfiguration />}
              <GamePositionSelector />
              <ButtonStyleSelector />
            </div>
            
            {/* Advanced Features - Only show if advanced mode is enabled */}
            {advancedMode && (
              <>
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Personnalisation avancée</h3>
                  </div>
                  
                  {selectedGameType === 'wheel' && (
                    <>
                      <AdvancedWheelCustomization />
                      <CustomPointerUpload />
                      <WheelCenterCustomization />
                      <SegmentOverlayCustomization />
                      <WheelRenderingEffects />
                    </>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Monétisation & Pro</h3>
                  </div>
                  
                  <MonetizationFeatures />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Puzzle className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Extensions</h3>
                  </div>
                  
                  <ProExtensions />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;
