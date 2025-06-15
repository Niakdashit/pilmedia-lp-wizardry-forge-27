
import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone } from 'lucide-react';
import { WizardData } from '../ModernWizard';

interface LivePreviewProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  wizardData,
  updateWizardData,
  nextStep,
  prevStep,
  goToStep
}) => {
  const [activeDevice, setActiveDevice] = React.useState<'desktop' | 'mobile'>('desktop');

  const handleAdvanced = () => {
    updateWizardData({ isAdvanced: true });
    goToStep(4); // Go to advanced customization
  };

  return (
    <div className="h-full flex flex-col px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#841b60] to-[#6554c0] bg-clip-text text-transparent mb-4">
          Votre expérience est prête !
        </h1>
        <p className="text-lg text-gray-600">
          Découvrez le rendu sur desktop et mobile
        </p>
      </motion.div>

      {/* Device selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-2 border border-white/50 shadow-lg">
          <button
            onClick={() => setActiveDevice('desktop')}
            className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
              activeDevice === 'desktop'
                ? 'bg-gradient-to-r from-[#841b60] to-[#6554c0] text-white shadow-lg'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <Monitor className="w-5 h-5 mr-2" />
            Desktop
          </button>
          <button
            onClick={() => setActiveDevice('mobile')}
            className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 ${
              activeDevice === 'mobile'
                ? 'bg-gradient-to-r from-[#841b60] to-[#6554c0] text-white shadow-lg'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <Smartphone className="w-5 h-5 mr-2" />
            Mobile
          </button>
        </div>
      </motion.div>

      {/* Preview area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="flex-1 flex justify-center items-center mb-8"
      >
        <div className={`
          bg-white rounded-3xl shadow-2xl border-8 border-gray-200 overflow-hidden
          ${activeDevice === 'desktop' ? 'w-full max-w-4xl h-96' : 'w-80 h-[600px]'}
          transition-all duration-500
        `}>
          <div className="w-full h-full bg-gradient-to-br from-violet-50 to-blue-50 flex items-center justify-center relative">
            {/* Background image */}
            {wizardData.campaign?.design?.backgroundImage && (
              <img
                src={activeDevice === 'mobile' 
                  ? wizardData.campaign.design.mobileBackgroundImage || wizardData.campaign.design.backgroundImage
                  : wizardData.campaign.design.backgroundImage
                }
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            
            {/* Content overlay */}
            <div className="relative z-10 text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl m-8">
              {wizardData.campaign?.design?.logo && (
                <img
                  src={wizardData.campaign.design.logo}
                  alt="Logo"
                  className="w-16 h-16 mx-auto mb-4 object-contain"
                />
              )}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {wizardData.campaign?.content?.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {wizardData.campaign?.content?.description}
              </p>
              <button 
                className="px-6 py-3 bg-gradient-to-r from-[#841b60] to-[#6554c0] text-white rounded-xl font-semibold"
              >
                {wizardData.campaign?.content?.cta}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-300"
        >
          Retour
        </motion.button>

        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdvanced}
            className="px-6 py-3 border-2 border-[#841b60] text-[#841b60] rounded-xl font-semibold hover:bg-[#841b60] hover:text-white transition-all duration-300"
          >
            + Avancé
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextStep}
            className="px-8 py-3 bg-gradient-to-r from-[#841b60] to-[#6554c0] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Publier
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
