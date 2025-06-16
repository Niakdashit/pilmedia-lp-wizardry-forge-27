
import React from 'react';
import { ArrowLeft, Eye, Save, Menu } from 'lucide-react';
import { CampaignType } from '../../../utils/campaignTypes';
import EditorDeviceSelector from './EditorDeviceSelector';

interface EditorHeaderProps {
  campaign: any;
  isNewCampaign: boolean;
  campaignType: CampaignType;
  gameTypeLabels: Record<string, string>;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
  onExit: () => void;
  onMobilePanelToggle: () => void;
  onPreview: () => void;
  onSave: () => void;
  isLoading: boolean;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  campaign,
  isNewCampaign,
  campaignType,
  gameTypeLabels,
  previewDevice,
  onDeviceChange,
  onExit,
  onMobilePanelToggle,
  onPreview,
  onSave,
  isLoading
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Exit button */}
          <button
            onClick={onExit}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          {/* Mobile panel toggle */}
          <button
            onClick={onMobilePanelToggle}
            className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-900">
              {isNewCampaign ? 'Nouvel Éditeur' : campaign.name}
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              {gameTypeLabels[campaignType]} • {isNewCampaign ? 'Brouillon' : campaign.status}
            </p>
          </div>
        </div>

        {/* Center - Device selector */}
        <div className="hidden md:flex">
          <EditorDeviceSelector
            previewDevice={previewDevice}
            onDeviceChange={onDeviceChange}
          />
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <button
            onClick={onPreview}
            className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden md:inline">Aperçu</span>
          </button>
          
          <button
            onClick={onSave}
            disabled={isLoading}
            className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-gradient-to-r from-[#841b60] to-[#6d164f] hover:from-[#6d164f] hover:to-[#841b60] text-white rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span className="hidden md:inline">{isLoading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
          </button>
        </div>
      </div>

      {/* Mobile device selector */}
      <div className="md:hidden flex justify-center py-2 border-t border-gray-100">
        <EditorDeviceSelector
          previewDevice={previewDevice}
          onDeviceChange={onDeviceChange}
        />
      </div>
    </div>
  );
};

export default EditorHeader;
