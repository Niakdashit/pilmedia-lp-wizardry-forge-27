
import React from 'react';
import { motion } from 'framer-motion';

interface BrandCustomizationProps {
  onNext: () => void;
  onBack: () => void;
}

const BrandCustomization: React.FC<BrandCustomizationProps> = ({
  onNext,
  onBack
}) => {
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
          Fine-tune your brand identity
        </p>
      </motion.div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
        <p className="text-gray-600 text-center">
          Brand customization step coming soon...
        </p>
      </div>

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
