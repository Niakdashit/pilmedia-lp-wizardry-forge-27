
import React, { useState } from 'react';
import { WizardData } from '../ModernWizard';
import { Eye, Monitor, Smartphone, Tablet } from 'lucide-react';

interface PreviewStepProps {
  wizardData: WizardData;
  nextStep: () => void;
  prevStep: () => void;
}

const PreviewStep: React.FC<PreviewStepProps> = ({
  wizardData,
  nextStep,
  prevStep
}) => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="space-y-8">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#141e29] mb-3">
            Aperçu de votre campagne
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            Découvrez le rendu final de votre expérience interactive sur tous les appareils.
          </p>
        </div>

        {/* Device Selector */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-[#141e29] mb-4">Aperçu par appareil</h3>
          <div className="flex space-x-3">
            {[
              { id: 'desktop', label: 'Ordinateur', icon: Monitor },
              { id: 'tablet', label: 'Tablette', icon: Tablet },
              { id: 'mobile', label: 'Mobile', icon: Smartphone }
            ].map((device) => {
              const Icon = device.icon;
              return (
                <button
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id as any)}
                  className={`
                    flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-200 font-medium
                    ${selectedDevice === device.id
                      ? 'bg-[#951b6d] text-white shadow-lg scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{device.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-[#951b6d]/10 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-[#951b6d]" />
            </div>
            <h3 className="font-semibold text-[#141e29]">Aperçu {selectedDevice}</h3>
          </div>

          <div className="bg-gradient-to-br from-[#f8fafc] to-gray-50 rounded-2xl p-12 min-h-96 flex items-center justify-center">
            <div className="text-center space-y-6">
              {selectedDevice === 'desktop' && (
                <div className="w-96 h-64 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    {wizardData.logo && (
                      <img src={wizardData.logo} alt="Logo" className="max-h-12 mx-auto" />
                    )}
                    <h4 className="font-bold text-[#141e29] text-xl">{wizardData.generatedCampaign?.title}</h4>
                    <p className="text-gray-600 text-sm px-4">{wizardData.generatedCampaign?.description}</p>
                    <button className="px-6 py-3 bg-[#951b6d] text-white rounded-xl font-semibold">
                      {wizardData.generatedCampaign?.cta}
                    </button>
                  </div>
                </div>
              )}
              
              {selectedDevice === 'tablet' && (
                <div className="w-80 h-64 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    {wizardData.logo && (
                      <img src={wizardData.logo} alt="Logo" className="max-h-10 mx-auto" />
                    )}
                    <h4 className="font-bold text-[#141e29] text-lg">{wizardData.generatedCampaign?.title}</h4>
                    <p className="text-gray-600 text-xs px-4">{wizardData.generatedCampaign?.description}</p>
                    <button className="px-5 py-2 bg-[#951b6d] text-white rounded-lg font-semibold text-sm">
                      {wizardData.generatedCampaign?.cta}
                    </button>
                  </div>
                </div>
              )}
              
              {selectedDevice === 'mobile' && (
                <div className="w-64 h-96 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center">
                  <div className="text-center space-y-4 px-4">
                    {wizardData.logo && (
                      <img src={wizardData.logo} alt="Logo" className="max-h-8 mx-auto" />
                    )}
                    <h4 className="font-bold text-[#141e29] text-lg">{wizardData.generatedCampaign?.title}</h4>
                    <p className="text-gray-600 text-xs">{wizardData.generatedCampaign?.description}</p>
                    <button className="px-6 py-3 bg-[#951b6d] text-white rounded-xl font-semibold text-sm w-full">
                      {wizardData.generatedCampaign?.cta}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Campaign Summary */}
        <div className="bg-gradient-to-r from-emerald-50 to-[#951b6d]/5 rounded-2xl border border-emerald-200 p-6 mb-8">
          <h3 className="font-semibold text-[#141e29] mb-4">Résumé de votre campagne</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <div className="text-2xl font-bold text-[#951b6d] mb-1">{wizardData.selectedGame}</div>
              <div className="text-sm text-gray-600">Type de jeu</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <div className="text-2xl font-bold text-emerald-600 mb-1">
                {[wizardData.logo, wizardData.desktopVisual, wizardData.mobileVisual].filter(Boolean).length}
              </div>
              <div className="text-sm text-gray-600">Contenus ajoutés</div>
            </div>
            <div className="text-center p-4 bg-white/60 rounded-xl">
              <div className="text-2xl font-bold text-[#141e29] mb-1">Prêt</div>
              <div className="text-sm text-gray-600">Statut</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 hover:scale-105"
          >
            Retour
          </button>
          <div className="flex space-x-4">
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-200 hover:scale-105"
            >
              + Avancé
            </button>
            <button
              onClick={() => {
                // Skip to publish step
                nextStep();
                setTimeout(nextStep, 50);
              }}
              className="px-8 py-3 bg-[#951b6d] text-white font-semibold rounded-xl hover:bg-[#7d1659] transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Publier maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;
