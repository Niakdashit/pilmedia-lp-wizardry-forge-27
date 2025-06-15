
import React from 'react';
import { WizardData } from '../ModernWizard';
import { Eye, Monitor, Smartphone, Tablet, Maximize2, RotateCw } from 'lucide-react';

interface PreviewStepProps {
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const PreviewStep: React.FC<PreviewStepProps> = ({
  wizardData,
  nextStep,
  prevStep
}) => {
  const [selectedDevice, setSelectedDevice] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const handleDeviceChange = async (device: 'desktop' | 'tablet' | 'mobile') => {
    if (device === selectedDevice) return;
    
    setIsTransitioning(true);
    
    // Wait for exit animation
    setTimeout(() => {
      setSelectedDevice(device);
      // Wait for entry animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 200);
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return Monitor;
      case 'tablet': return Tablet;
      case 'mobile': return Smartphone;
      default: return Monitor;
    }
  };

  const getDeviceMockup = () => {
    const baseClasses = `transition-all duration-500 ease-out transform ${
      isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
    }`;

    switch (selectedDevice) {
      case 'desktop':
        return (
          <div className={`${baseClasses} mx-auto`}>
            <div className="relative w-[900px] h-[600px] bg-gradient-to-br from-gray-100 to-gray-300 rounded-3xl shadow-2xl border-8 border-gray-800 overflow-hidden">
              {/* Desktop bezel */}
              <div className="absolute inset-0 bg-black rounded-2xl">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
                <div className="absolute inset-4 bg-white rounded-xl overflow-hidden shadow-inner">
                  {/* Campaign content */}
                  <div className="w-full h-full bg-gradient-to-br from-[#ebf4f7] to-white flex items-center justify-center relative">
                    {wizardData.desktopVisual && (
                      <img 
                        src={wizardData.desktopVisual} 
                        alt="Desktop preview" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="relative z-10 text-center bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                      {wizardData.logo && (
                        <img src={wizardData.logo} alt="Logo" className="w-16 h-16 mx-auto mb-4 object-contain" />
                      )}
                      <h3 className="text-2xl font-bold text-[#141e29] mb-2">
                        {wizardData.productName || 'Ma Campagne'}
                      </h3>
                      <p className="text-gray-600 mb-4">Expérience {wizardData.selectedGame}</p>
                      <button className="px-8 py-3 bg-[#951b6d] text-white font-semibold rounded-xl hover:bg-[#7d1659] transition-colors shadow-lg">
                        Participer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Stand */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-b-2xl shadow-lg"></div>
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full shadow-2xl"></div>
            </div>
          </div>
        );

      case 'tablet':
        return (
          <div className={`${baseClasses} mx-auto`}>
            <div className="relative w-[600px] h-[800px] bg-gradient-to-br from-gray-100 to-gray-300 rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden">
              {/* Tablet bezel */}
              <div className="absolute inset-0 bg-black rounded-[2.5rem]">
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-700 rounded-full"></div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-700 rounded-full"></div>
                <div className="absolute inset-12 bg-white rounded-2xl overflow-hidden shadow-inner">
                  {/* Campaign content */}
                  <div className="w-full h-full bg-gradient-to-br from-[#ebf4f7] to-white flex items-center justify-center relative">
                    {wizardData.desktopVisual && (
                      <img 
                        src={wizardData.desktopVisual} 
                        alt="Tablet preview" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="relative z-10 text-center bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-sm">
                      {wizardData.logo && (
                        <img src={wizardData.logo} alt="Logo" className="w-14 h-14 mx-auto mb-3 object-contain" />
                      )}
                      <h3 className="text-xl font-bold text-[#141e29] mb-2">
                        {wizardData.productName || 'Ma Campagne'}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm">Expérience {wizardData.selectedGame}</p>
                      <button className="px-6 py-2.5 bg-[#951b6d] text-white font-semibold rounded-xl hover:bg-[#7d1659] transition-colors shadow-lg">
                        Participer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'mobile':
        return (
          <div className={`${baseClasses} mx-auto`}>
            <div className="relative w-[320px] h-[680px] bg-gradient-to-br from-gray-100 to-gray-300 rounded-[2.5rem] shadow-2xl border-6 border-gray-800 overflow-hidden">
              {/* Mobile bezel */}
              <div className="absolute inset-0 bg-black rounded-[2rem]">
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full"></div>
                <div className="absolute inset-6 bg-white rounded-2xl overflow-hidden shadow-inner">
                  {/* Campaign content */}
                  <div className="w-full h-full bg-gradient-to-br from-[#ebf4f7] to-white flex items-center justify-center relative">
                    {(wizardData.mobileVisual || wizardData.desktopVisual) && (
                      <img 
                        src={wizardData.mobileVisual || wizardData.desktopVisual} 
                        alt="Mobile preview" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="relative z-10 text-center bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg mx-4">
                      {wizardData.logo && (
                        <img src={wizardData.logo} alt="Logo" className="w-12 h-12 mx-auto mb-3 object-contain" />
                      )}
                      <h3 className="text-lg font-bold text-[#141e29] mb-2">
                        {wizardData.productName || 'Ma Campagne'}
                      </h3>
                      <p className="text-gray-600 mb-3 text-xs">Expérience {wizardData.selectedGame}</p>
                      <button className="w-full px-4 py-2 bg-[#951b6d] text-white font-semibold rounded-lg hover:bg-[#7d1659] transition-colors shadow-lg text-sm">
                        Participer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-[#141e29] mb-4">
          Découvrez votre campagne en action
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Voici exactement ce que vos utilisateurs verront sur tous leurs appareils. 
          Votre campagne s'adapte parfaitement à chaque écran.
        </p>
      </div>

      {/* Device Selector */}
      <div className="flex justify-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-sm border border-gray-100/50">
          <div className="flex space-x-1">
            {[
              { id: 'desktop', label: 'Desktop', icon: Monitor },
              { id: 'tablet', label: 'Tablette', icon: Tablet },
              { id: 'mobile', label: 'Mobile', icon: Smartphone }
            ].map((device) => {
              const Icon = device.icon;
              const isActive = selectedDevice === device.id;
              
              return (
                <button
                  key={device.id}
                  onClick={() => handleDeviceChange(device.id as any)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-[#951b6d] text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:text-[#951b6d] hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{device.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Device Preview */}
      <div className="relative min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#951b6d]/5 to-transparent rounded-3xl"></div>
        {getDeviceMockup()}
      </div>

      {/* Action Controls */}
      <div className="flex justify-center space-x-4">
        <button
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-[#951b6d] transition-colors"
          title="Plein écran"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="text-sm">Plein écran</span>
        </button>
        <button
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-[#951b6d] transition-colors"
          title="Rotation"
        >
          <RotateCw className="w-4 h-4" />
          <span className="text-sm">Rotation</span>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <button 
          onClick={prevStep} 
          className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Retour
        </button>
        <button 
          onClick={nextStep} 
          className="px-8 py-3 bg-[#951b6d] text-white font-semibold rounded-xl hover:bg-[#7d1659] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Publier la campagne
        </button>
      </div>
    </div>
  );
};

export default PreviewStep;
