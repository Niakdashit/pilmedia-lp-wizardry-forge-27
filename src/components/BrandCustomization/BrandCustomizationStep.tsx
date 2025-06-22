
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import BrandUrlExtractor from './BrandUrlExtractor';
import FontSelector from './FontSelector';
import BackgroundGallery from './BackgroundGallery';

interface BrandCustomizationStepProps {
  gameType: string;
  onNext: (brandData: any) => void;
  onBack: () => void;
}

const BrandCustomizationStep: React.FC<BrandCustomizationStepProps> = ({
  gameType,
  onNext,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'fonts' | 'backgrounds'>('colors');
  const [brandData, setBrandData] = useState({
    websiteUrl: '',
    logoUrl: '',
    extractedColors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#F59E0B'
    },
    selectedFont: 'Inter',
    selectedBackground: 'gradient-1'
  });

  const tabs = [
    { id: 'colors', label: 'Colors & Logo', description: 'Extract your brand colors' },
    { id: 'fonts', label: 'Typography', description: 'Choose your font style' },
    { id: 'backgrounds', label: 'Backgrounds', description: 'Select visual themes' }
  ];

  const updateBrandData = (field: string, value: any) => {
    setBrandData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = brandData.extractedColors.primary !== '#3B82F6' || 
                     brandData.selectedFont !== 'Inter' || 
                     brandData.selectedBackground !== 'gradient-1';

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Brand Customization
        </h1>
        <p className="text-xl text-gray-600">
          Customize your {gameType} campaign with your brand identity
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'colors' | 'fonts' | 'backgrounds')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="text-center">
                <div className="font-semibold">{tab.label}</div>
                <div className="text-xs opacity-75">{tab.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8"
      >
        {activeTab === 'colors' && (
          <BrandUrlExtractor
            data={brandData}
            onChange={(colors) => updateBrandData('extractedColors', colors)}
            onLogoChange={(logoUrl) => updateBrandData('logoUrl', logoUrl)}
            onWebsiteChange={(websiteUrl) => updateBrandData('websiteUrl', websiteUrl)}
          />
        )}
        
        {activeTab === 'fonts' && (
          <FontSelector
            selectedFont={brandData.selectedFont}
            onChange={(font: string) => updateBrandData('selectedFont', font)}
            gameType={gameType}
          />
        )}
        
        {activeTab === 'backgrounds' && (
          <BackgroundGallery
            selectedBackground={brandData.selectedBackground}
            onSelect={(background: string) => updateBrandData('selectedBackground', background)}
            brandColors={brandData.extractedColors}
          />
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <motion.button
          onClick={onBack}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        <motion.button
          onClick={() => onNext(brandData)}
          disabled={!canProceed}
          className={`flex items-center space-x-2 px-8 py-3 rounded-full transition-all duration-300 ${
            canProceed
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={canProceed ? { scale: 1.05 } : {}}
          whileTap={canProceed ? { scale: 0.95 } : {}}
        >
          <span>Continue to AI Generation</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default BrandCustomizationStep;
