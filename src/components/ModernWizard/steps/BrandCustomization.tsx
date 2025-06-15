
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Upload, Eye, Sparkles } from 'lucide-react';
import { CampaignData } from '../../../pages/ModernCampaignWizard';
import BrandAssetUpload from '../components/BrandAssetUpload';
import ChipSelector from '../components/ChipSelector';

interface BrandCustomizationProps {
  campaignData: CampaignData;
  updateCampaignData: (updates: Partial<CampaignData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const colorPalettes = [
  { name: 'Purple Gradient', primary: '#841b60', secondary: '#9333ea' },
  { name: 'Blue Ocean', primary: '#0ea5e9', secondary: '#3b82f6' },
  { name: 'Green Forest', primary: '#059669', secondary: '#10b981' },
  { name: 'Orange Sunset', primary: '#ea580c', secondary: '#f97316' },
  { name: 'Pink Rose', primary: '#e11d48', secondary: '#f43f5e' },
  { name: 'Teal Ocean', primary: '#0d9488', secondary: '#14b8a6' }
];

const BrandCustomization: React.FC<BrandCustomizationProps> = ({
  campaignData,
  updateCampaignData,
  onNext,
  onBack
}) => {
  const [selectedPalette, setSelectedPalette] = useState(
    colorPalettes.find(p => p.primary === campaignData.mainColor) || colorPalettes[0]
  );

  const handleColorPaletteChange = (palette: typeof colorPalettes[0]) => {
    setSelectedPalette(palette);
    updateCampaignData({ 
      mainColor: palette.primary,
      brandConfig: { 
        ...campaignData.brandConfig, 
        secondaryColor: palette.secondary 
      }
    });
  };

  const handleBrandConfigUpdate = (updates: any) => {
    updateCampaignData({
      brandConfig: { ...campaignData.brandConfig, ...updates }
    });
  };

  const brandConfig = campaignData.brandConfig || {};

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Brand Customization
        </h1>
        <p className="text-lg text-gray-600">
          Fine-tune your brand identity and visual style
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logo Upload */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-[#841b60]" />
            Brand Logo
          </h3>
          
          <BrandAssetUpload
            logo={campaignData.logo}
            onLogoChange={(logo) => updateCampaignData({ logo })}
          />
        </motion.div>

        {/* Color Palette */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Palette className="w-5 h-5 mr-2 text-[#841b60]" />
            Color Palette
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {colorPalettes.map((palette, index) => (
              <motion.button
                key={palette.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleColorPaletteChange(palette)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedPalette.name === palette.name
                    ? 'border-gray-900 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: palette.primary }}
                  />
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: palette.secondary }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {palette.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Brand Style Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-[#841b60]" />
          Brand Style
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <ChipSelector
              label="Visual Style"
              options={['Modern', 'Classic', 'Playful', 'Elegant', 'Bold', 'Minimalist']}
              selected={brandConfig.visualStyle || 'Modern'}
              onChange={(style) => handleBrandConfigUpdate({ visualStyle: style })}
            />
          </div>

          <div>
            <ChipSelector
              label="Button Style"
              options={['Rounded', 'Sharp', 'Soft', 'Gradient']}
              selected={brandConfig.buttonStyle || 'Rounded'}
              onChange={(style) => handleBrandConfigUpdate({ buttonStyle: style })}
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom CSS (Advanced)
          </label>
          <textarea
            value={brandConfig.customCSS || ''}
            onChange={(e) => handleBrandConfigUpdate({ customCSS: e.target.value })}
            placeholder="/* Add your custom CSS here */&#10;.game-container {&#10;  border-radius: 20px;&#10;}"
            className="w-full px-4 py-3 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-[#841b60] transition-all resize-none"
            rows={4}
          />
        </div>
      </motion.div>

      {/* Live Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2 text-[#841b60]" />
          Live Preview
        </h3>
        
        <div 
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 text-center"
          style={{ 
            background: `linear-gradient(135deg, ${selectedPalette.primary}10, ${selectedPalette.secondary}10)` 
          }}
        >
          <div className="inline-block mb-4">
            {campaignData.logo ? (
              typeof campaignData.logo === 'string' ? (
                <img src={campaignData.logo} alt="Logo" className="h-12 w-auto" />
              ) : (
                <img 
                  src={URL.createObjectURL(campaignData.logo)} 
                  alt="Logo" 
                  className="h-12 w-auto" 
                />
              )
            ) : (
              <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">Logo</span>
              </div>
            )}
          </div>
          
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            {campaignData.slogan || 'Your Brand Slogan'}
          </h4>
          
          <button
            className={`px-6 py-3 text-white font-medium transition-all duration-300 ${
              brandConfig.buttonStyle === 'Sharp' ? 'rounded-none' :
              brandConfig.buttonStyle === 'Soft' ? 'rounded-2xl' :
              'rounded-xl'
            }`}
            style={{ 
              background: `linear-gradient(135deg, ${selectedPalette.primary}, ${selectedPalette.secondary})` 
            }}
          >
            Play {campaignData.gameType || 'Game'}
          </button>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back
        </button>
        
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-[#841b60] to-purple-600 text-white hover:shadow-lg hover:scale-105 transition-all"
        >
          Generate with AI →
        </button>
      </div>
    </div>
  );
};

export default BrandCustomization;
