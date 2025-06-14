
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Type, Image, ArrowRight, ArrowLeft, Wand2 } from 'lucide-react';
import BrandUrlExtractor from './BrandUrlExtractor';
import FontSelector from './FontSelector';
import BackgroundGallery from './BackgroundGallery';

interface BrandCustomizationStepProps {
  gameType: string;
  onNext: (data: any) => void;
  onBack: () => void;
  className?: string;
}

const BrandCustomizationStep: React.FC<BrandCustomizationStepProps> = ({
  gameType,
  onNext,
  onBack,
  className = ''
}) => {
  const [activeSection, setActiveSection] = useState<'brand' | 'fonts' | 'background'>('brand');
  const [brandData, setBrandData] = useState({
    extractedColors: {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#10B981'
    },
    logoUrl: '',
    websiteUrl: '',
    selectedFont: 'Inter',
    backgroundImage: '',
    backgroundType: 'gradient'
  });

  const sections = [
    { id: 'brand', label: 'Brand Colors', icon: Palette },
    { id: 'fonts', label: 'Typography', icon: Type },
    { id: 'background', label: 'Background', icon: Image }
  ];

  const updateBrandData = (section: string, data: any) => {
    setBrandData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], ...data }
    }));
  };

  const handleNext = () => {
    const sectionIndex = sections.findIndex(section => section.id === activeSection);
    if (sectionIndex < sections.length - 1) {
      setActiveSection(sections[sectionIndex + 1].id as 'brand' | 'fonts' | 'background');
    } else {
      onNext(brandData);
    }
  };

  const handlePrevious = () => {
    const sectionIndex = sections.findIndex(section => section.id === activeSection);
    if (sectionIndex > 0) {
      setActiveSection(sections[sectionIndex - 1].id as 'brand' | 'fonts' | 'background');
    } else {
      onBack();
    }
  };

  const isSectionComplete = (sectionId: string) => {
    switch (sectionId) {
      case 'brand':
        return brandData.extractedColors.primary !== '#3B82F6';
      case 'fonts':
        return brandData.selectedFont !== 'Inter';
      case 'background':
        return brandData.backgroundImage || brandData.backgroundType !== 'gradient';
      default:
        return false;
    }
  };

  const canProceed = isSectionComplete(activeSection);

  return (
    <div className={`max-w-6xl mx-auto px-6 py-12 ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Wand2 className="w-8 h-8 mr-3 text-purple-600" />
          Brand Customization
        </h1>
        <p className="text-xl text-gray-600">
          Extract your brand colors, choose typography, and select the perfect background
        </p>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const isCompleted = isSectionComplete(section.id);
            const isPast = sections.findIndex(s => s.id === activeSection) > index;

            return (
              <motion.div
                key={section.id}
                className="flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setActiveSection(section.id as 'brand' | 'fonts' | 'background')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg'
                      : isCompleted || isPast
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                  {(isCompleted || isPast) && !isActive && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </button>
                {index < sections.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-200 mx-4"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8"
      >
        {activeSection === 'brand' && (
          <BrandUrlExtractor
            data={brandData}
            onChange={(data) => updateBrandData('extractedColors', data.extractedColors)}
            onLogoChange={(logoUrl) => updateBrandData('logoUrl', logoUrl)}
            onWebsiteChange={(websiteUrl) => updateBrandData('websiteUrl', websiteUrl)}
          />
        )}
        
        {activeSection === 'fonts' && (
          <FontSelector
            selectedFont={brandData.selectedFont}
            onChange={(font) => updateBrandData('selectedFont', font)}
            gameType={gameType}
          />
        )}
        
        {activeSection === 'background' && (
          <BackgroundGallery
            selectedBackground={brandData.backgroundImage}
            backgroundType={brandData.backgroundType}
            onBackgroundChange={(bg) => updateBrandData('backgroundImage', bg)}
            onTypeChange={(type) => updateBrandData('backgroundType', type)}
            brandColors={brandData.extractedColors}
          />
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <motion.button
          onClick={handlePrevious}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={!canProceed}
          className={`flex items-center space-x-2 px-8 py-3 rounded-full transition-all duration-300 ${
            canProceed
              ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={canProceed ? { scale: 1.05 } : {}}
          whileTap={canProceed ? { scale: 0.95 } : {}}
        >
          <span>{activeSection === 'background' ? 'Continue to AI Generation' : 'Next Step'}</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default BrandCustomizationStep;
