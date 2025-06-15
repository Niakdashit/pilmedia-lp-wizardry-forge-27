
import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, Palette, Type, Layout } from 'lucide-react';
import MobileLayout from './Mobile/MobileLayout';
import MobileVisuals from './Mobile/MobileVisuals';
import MobileTexts from './Mobile/MobileTexts';
import MobileGamePlacement from './Mobile/MobileGamePlacement';
import MobileButtons from './Mobile/MobileButtons';
import MobilePreview from './Mobile/MobilePreview';

interface CampaignMobileProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
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
    label: 'Layout',
    icon: Layout
  }, {
    id: 'visuals',
    label: 'Visuels',
    icon: Palette
  }, {
    id: 'texts',
    label: 'Textes',
    icon: Type
  }, {
    id: 'game',
    label: 'Jeu',
    icon: Monitor
  }, {
    id: 'buttons',
    label: 'Boutons',
    icon: Smartphone
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-left mb-12 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-5xl font-light text-[#141E29] mb-6 leading-tight">
              Optimisez pour
              <span className="relative">
                <span className="bg-gradient-to-r from-[#951B6D] to-[#A020F0] bg-clip-text text-transparent font-medium"> mobile</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#951B6D] to-[#A020F0] opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl text-[#64748B] leading-relaxed font-light">
              Adaptez votre campagne pour offrir une expérience parfaite 
              sur tous les appareils mobiles et tablettes.
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Left Panel - Configuration */}
          <div className="flex-1">
            {/* Sub-tabs */}
            <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm mb-8">
              <div className="flex overflow-x-auto p-2">
                <div className="flex space-x-2 min-w-max">
                  {subTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveSubTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap font-bold ${
                          activeSubTab === tab.id
                            ? 'bg-[#951B6D] text-white shadow-md'
                            : 'text-[#64748B] hover:text-[#951B6D] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
              {renderSubTabContent()}
            </div>
          </div>

          {/* Right Panel - Preview */}
          {!hidePreview && (
            <div className="w-80 bg-white rounded-xl border border-[#EDF3F7] shadow-sm">
              {/* Preview Mode Toggle */}
              <div className="p-6 border-b border-[#EDF3F7]">
                <div className="flex items-center justify-center space-x-2 bg-[#F8FAFC] rounded-xl p-1 border border-[#EDF3F7]">
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-lg font-bold transition-all duration-300 ${
                      previewMode === 'mobile'
                        ? 'bg-[#951B6D] text-white shadow-md'
                        : 'text-[#64748B] hover:text-[#951B6D]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Mobile</span>
                  </button>
                  <button
                    onClick={() => setPreviewMode('tablet')}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-lg font-bold transition-all duration-300 ${
                      previewMode === 'tablet'
                        ? 'bg-[#951B6D] text-white shadow-md'
                        : 'text-[#64748B] hover:text-[#951B6D]'
                    }`}
                  >
                    <Tablet className="w-4 h-4" />
                    <span>Tablet</span>
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="p-6 flex items-center justify-center min-h-96 bg-gradient-to-br from-[#F8FAFC] to-[#EDF3F7]">
                <MobilePreview campaign={campaign} previewMode={previewMode} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignMobile;
