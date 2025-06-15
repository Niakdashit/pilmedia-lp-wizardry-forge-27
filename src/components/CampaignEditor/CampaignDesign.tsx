
import React from 'react';
import { Palette, Type, Image as ImageIcon, Brush, Monitor } from 'lucide-react';
import ImageUpload from '../common/ImageUpload';
import JackpotAppearance from './JackpotAppearance';

interface CampaignDesignProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const CampaignDesign: React.FC<CampaignDesignProps> = ({ campaign, setCampaign }) => {
  const updateDesign = (key: string, value: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      design: { ...prev.design, [key]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-left mb-12 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-5xl font-light text-[#141E29] mb-6 leading-tight">
              Personnalisez le
              <span className="relative">
                <span className="bg-gradient-to-r from-[#951B6D] to-[#A020F0] bg-clip-text text-transparent font-medium"> design</span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#951B6D] to-[#A020F0] opacity-30"></div>
              </span>
            </h1>
            
            <p className="text-xl text-[#64748B] leading-relaxed font-light">
              Créez une identité visuelle unique qui reflète votre marque et 
              captive votre audience avec style et élégance.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Jackpot Specific Appearance */}
          {campaign.type === 'jackpot' && (
            <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-[#951B6D]" />
                </div>
                <h3 className="text-xl font-bold text-[#141E29]">Apparence du jackpot</h3>
              </div>
              <JackpotAppearance campaign={campaign} setCampaign={setCampaign} />
            </div>
          )}

          {/* Color Palette Card */}
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Palette de couleurs</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
                <label className="block text-sm font-bold text-[#141E29] mb-3">
                  Couleur principale
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={campaign.design.primaryColor}
                    onChange={(e) => updateDesign('primaryColor', e.target.value)}
                    className="w-12 h-12 border border-[#EDF3F7] rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    value={campaign.design.primaryColor}
                    onChange={(e) => updateDesign('primaryColor', e.target.value)}
                    className="flex-1 px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                  />
                </div>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
                <label className="block text-sm font-bold text-[#141E29] mb-3">
                  Couleur secondaire
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={campaign.design.secondaryColor}
                    onChange={(e) => updateDesign('secondaryColor', e.target.value)}
                    className="w-12 h-12 border border-[#EDF3F7] rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    value={campaign.design.secondaryColor}
                    onChange={(e) => updateDesign('secondaryColor', e.target.value)}
                    className="flex-1 px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                  />
                </div>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
                <label className="block text-sm font-bold text-[#141E29] mb-3">
                  Arrière-plan
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={campaign.design.background}
                    onChange={(e) => updateDesign('background', e.target.value)}
                    className="w-12 h-12 border border-[#EDF3F7] rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    value={campaign.design.background}
                    onChange={(e) => updateDesign('background', e.target.value)}
                    className="flex-1 px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography Card */}
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <Type className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Typographie</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
                <label className="block text-sm font-bold text-[#141E29] mb-3">
                  Police principale
                </label>
                <select
                  value={campaign.design.fontFamily}
                  onChange={(e) => updateDesign('fontFamily', e.target.value)}
                  className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                >
                  <option value="Inter">Inter</option>
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
                <label className="block text-sm font-bold text-[#141E29] mb-3">
                  Taille de police
                </label>
                <select
                  value={campaign.design.fontSize}
                  onChange={(e) => updateDesign('fontSize', e.target.value)}
                  className="w-full px-4 py-3 border border-[#EDF3F7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#951B6D] focus:border-transparent bg-white text-[#141E29] font-medium"
                >
                  <option value="small">Petite</option>
                  <option value="normal">Normale</option>
                  <option value="large">Grande</option>
                </select>
              </div>
            </div>
          </div>

          {/* Images Card */}
          <div className="bg-white rounded-xl border border-[#EDF3F7] shadow-sm p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-[#F8E9F0] rounded-xl flex items-center justify-center">
                <Monitor className="w-6 h-6 text-[#951B6D]" />
              </div>
              <h3 className="text-xl font-bold text-[#141E29]">Images et médias</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
                <ImageUpload
                  label="Logo de votre marque"
                  value={campaign.design.logoUrl}
                  onChange={(value) => updateDesign('logoUrl', value)}
                />
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7]">
                <ImageUpload
                  label="Image d'arrière-plan générale"
                  value={campaign.design.backgroundImage}
                  onChange={(value) => updateDesign('backgroundImage', value)}
                />
              </div>

              <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#EDF3F7] lg:col-span-2">
                <ImageUpload
                  label="Image d'arrière-plan mobile"
                  value={campaign.design.mobileBackgroundImage}
                  onChange={(value) => updateDesign('mobileBackgroundImage', value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDesign;
