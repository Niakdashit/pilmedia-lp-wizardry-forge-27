import React, { useState } from 'react';
import { Smartphone, Tablet } from 'lucide-react';
import MobileLayout from './Mobile/MobileLayout';
import MobileVisuals from './Mobile/MobileVisuals';
import MobileTexts from './Mobile/MobileTexts';
import MobileGamePlacement from './Mobile/MobileGamePlacement';
import MobileButtons from './Mobile/MobileButtons';
import MobilePreview from './Mobile/MobilePreview';
interface CampaignMobileProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
  /**
   * Hide the built-in preview panel. Useful when an outer editor already
   * renders its own preview component.
   */
  hidePreview?: boolean;
}
const CampaignMobile: React.FC<CampaignMobileProps> = ({
  campaign,
  setCampaign,
  hidePreview = false
}) => {
  const [activeSubTab, setActiveSubTab] = useState('layout');
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet'>('mobile');
  const subTabs = [{
    id: 'layout',
    label: 'Layout'
  }, {
    id: 'visuals',
    label: 'Mobile Visuals'
  }, {
    id: 'texts',
    label: 'Texts & Titles'
  }, {
    id: 'game',
    label: 'Game Placement'
  }, {
    id: 'buttons',
    label: 'Buttons & Actions'
  }];
  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case 'layout':
        return <MobileLayout campaign={campaign} setCampaign={setCampaign} />;
      case 'visuals':
        return <MobileVisuals campaign={campaign} setCampaign={setCampaign} />;
      case 'texts':
        return <MobileTexts campaign={campaign} setCampaign={setCampaign} />;
      case 'game':
        return <MobileGamePlacement campaign={campaign} setCampaign={setCampaign} />;
      case 'buttons':
        return <MobileButtons campaign={campaign} setCampaign={setCampaign} />;
      default:
        return null;
    }
  };
  return <div className="flex h-full">
      {/* Left Panel - Configuration */}
      <div className="flex-1 flex flex-col">
        {/* Sub-tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex space-x-1 px-4 py-2">
            {subTabs.map(tab => <button key={tab.id} onClick={() => setActiveSubTab(tab.id)} className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeSubTab === tab.id ? 'bg-white text-[#841b60] shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'}`}>
                {tab.label}
              </button>)}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderSubTabContent()}
        </div>
      </div>

      {/* Right Panel - Preview */}
      {!hidePreview && (
      <div className="w-96 border-l border-gray-200 bg-gray-50 flex flex-col">
        {/* Preview Mode Toggle */}
        <div className="p-4 border-b border-gray-200 py-0">
          <div className="flex items-center space-x-2 bg-white rounded-lg p-1 px-0 mx-[70px]">
            <button onClick={() => setPreviewMode('mobile')} className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-colors ${previewMode === 'mobile' ? 'bg-[#841b60] text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <Smartphone className="w-4 h-4" />
              <span>Mobile</span>
            </button>
            <button onClick={() => setPreviewMode('tablet')} className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-colors ${previewMode === 'tablet' ? 'bg-[#841b60] text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <Tablet className="w-4 h-4" />
              <span>Tablet</span>
            </button>
          </div>
        </div>

        {/* Preview - Extended height for full visibility */}
        <div className="flex-1 p-4 flex items-start justify-center overflow-y-auto" style={{
        minHeight: '600px'
      }}>
          <div className="w-full flex justify-center">
            <MobilePreview campaign={campaign} previewMode={previewMode} />
          </div>
        </div>
      </div>
      )}
    </div>;
};
export default CampaignMobile;