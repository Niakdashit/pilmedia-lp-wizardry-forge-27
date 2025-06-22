
import React, { useState } from 'react';
import { WizardData } from '../ModernWizard';
import { Monitor, Smartphone, Tablet, Settings } from 'lucide-react';

interface PreviewStepProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (stepIndex: number) => void;
}

const PreviewStep: React.FC<PreviewStepProps> = ({
  wizardData,
  nextStep,
  prevStep,
  goToStep
}) => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const devices = [
    { id: 'desktop', icon: Monitor, label: 'Desktop' },
    { id: 'tablet', icon: Tablet, label: 'Tablette' },
    { id: 'mobile', icon: Smartphone, label: 'Mobile' }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Aperçu de votre campagne
            </h1>
            <p className="text-gray-300">
              Visualisez votre campagne sur tous les appareils
            </p>
          </div>

          {/* Device Selector */}
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20">
            {devices.map((device) => {
              const IconComponent = device.icon;
              return (
                <button
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id as any)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300
                    ${selectedDevice === device.id
                      ? 'bg-[#841b60] text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium">{device.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Desktop Preview */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">Aperçu Desktop</h3>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 min-h-96">
              <div className="text-center">
                {wizardData.logo && (
                  <img src={wizardData.logo} alt="Logo" className="h-16 mx-auto mb-6" />
                )}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {wizardData.generatedCampaign?.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {wizardData.generatedCampaign?.description}
                </p>
                {wizardData.desktopVisual && (
                  <img src={wizardData.desktopVisual} alt="Visual" className="max-w-full h-48 object-cover rounded-xl mx-auto mb-6" />
                )}
                <button className="bg-[#841b60] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#6d164f] transition-colors">
                  {wizardData.generatedCampaign?.cta}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Preview */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">Aperçu Mobile</h3>
              <Smartphone className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="bg-white rounded-3xl p-4 max-w-xs mx-auto">
              <div className="text-center">
                {wizardData.logo && (
                  <img src={wizardData.logo} alt="Logo" className="h-12 mx-auto mb-4" />
                )}
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  {wizardData.generatedCampaign?.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {wizardData.generatedCampaign?.description}
                </p>
                {(wizardData.mobileVisual || wizardData.desktopVisual) && (
                  <img 
                    src={wizardData.mobileVisual || wizardData.desktopVisual} 
                    alt="Visual" 
                    className="w-full h-32 object-cover rounded-lg mb-4" 
                  />
                )}
                <button className="bg-[#841b60] text-white px-6 py-2 rounded-lg text-sm font-semibold w-full">
                  {wizardData.generatedCampaign?.cta}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            className="px-8 py-4 text-gray-300 hover:text-white transition-colors duration-300"
          >
            ← Retour
          </button>
          
          <div className="flex space-x-4">
            <button
              onClick={() => goToStep(4)}
              className="flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
              <span>+ Avancé</span>
            </button>
            
            <button
              onClick={nextStep}
              className="px-12 py-4 bg-gradient-to-r from-[#841b60] to-[#6d164f] text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-[#841b60]/50"
            >
              Publier →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;
