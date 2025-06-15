
import React from 'react';
import { WizardData } from '../ModernWizard';
import { Monitor, Smartphone, Tablet, Maximize2, RotateCw } from 'lucide-react';

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
      }, 400);
    }, 200);
  };

  const getDeviceMockup = () => {
    const baseClasses = `transition-all duration-700 ease-out transform ${
      isTransitioning ? 'opacity-0 scale-95 translate-y-8 rotate-1' : 'opacity-100 scale-100 translate-y-0 rotate-0'
    }`;

    const campaignContent = (
      <div className="w-full h-full bg-gradient-to-br from-[#ebf4f7] to-white flex items-center justify-center relative overflow-hidden">
        {/* Campaign visual background */}
        {wizardData.desktopVisual && (
          <img 
            src={selectedDevice === 'mobile' ? (wizardData.mobileVisual || wizardData.desktopVisual) : wizardData.desktopVisual} 
            alt="Campaign preview" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {/* Content overlay */}
        <div className="relative z-10 text-center bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/50 max-w-md mx-4">
          {wizardData.logo && (
            <img src={wizardData.logo} alt="Logo" className="w-16 h-16 mx-auto mb-4 object-contain drop-shadow-sm" />
          )}
          <h3 className="text-2xl font-bold text-[#141e29] mb-3">
            {wizardData.productName || 'Ma Campagne'}
          </h3>
          <p className="text-gray-600 mb-6 text-lg">Expérience {wizardData.selectedGame}</p>
          <button className="px-8 py-4 bg-gradient-to-r from-[#951b6d] to-[#7d1659] text-white font-semibold rounded-2xl hover:from-[#7d1659] hover:to-[#6b1248] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform">
            Participer maintenant
          </button>
        </div>
      </div>
    );

    switch (selectedDevice) {
      case 'desktop':
        return (
          <div className={`${baseClasses} mx-auto relative group`}>
            {/* Laptop Base */}
            <div className="relative">
              {/* Screen */}
              <div className="relative w-[1000px] h-[650px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-[3px] border-gray-200/80 overflow-hidden backdrop-blur-sm">
                {/* Screen bezel */}
                <div className="absolute inset-[8px] bg-black rounded-[1.5rem] overflow-hidden">
                  {/* Inner screen */}
                  <div className="absolute inset-[2px] rounded-[1.3rem] overflow-hidden bg-white">
                    {campaignContent}
                  </div>
                </div>
                
                {/* Subtle screen reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-[2rem] pointer-events-none"></div>
              </div>
              
              {/* Laptop Base */}
              <div className="relative w-[1100px] h-[60px] -mt-4 mx-auto">
                {/* Base shadow */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-300/50 to-gray-400/80 rounded-[3rem] transform perspective-[800px] rotateX-[45deg] shadow-[0_30px_80px_rgba(0,0,0,0.2)]"></div>
                {/* Base highlight */}
                <div className="absolute inset-x-8 top-0 h-8 bg-gradient-to-b from-gray-100 to-gray-200 rounded-[2rem] shadow-inner"></div>
              </div>
            </div>
            
            {/* Ambient glow */}
            <div className="absolute -inset-20 bg-gradient-radial from-[#951b6d]/10 via-transparent to-transparent opacity-60 blur-3xl pointer-events-none group-hover:opacity-80 transition-opacity duration-700"></div>
          </div>
        );

      case 'tablet':
        return (
          <div className={`${baseClasses} mx-auto relative group`}>
            <div className="relative w-[650px] h-[850px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-[3.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.2)] border-[4px] border-gray-200/70 overflow-hidden">
              {/* Home indicator */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gray-700/80 rounded-full shadow-inner"></div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full"></div>
              
              {/* Screen area */}
              <div className="absolute inset-16 bg-white rounded-[2.5rem] overflow-hidden shadow-inner">
                {campaignContent}
              </div>
              
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-[3.5rem] pointer-events-none"></div>
            </div>
            
            {/* Ambient glow */}
            <div className="absolute -inset-16 bg-gradient-radial from-[#951b6d]/15 via-transparent to-transparent opacity-50 blur-2xl pointer-events-none group-hover:opacity-75 transition-opacity duration-700"></div>
          </div>
        );

      case 'mobile':
        return (
          <div className={`${baseClasses} mx-auto relative group`}>
            <div className="relative w-[380px] h-[780px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.25)] border-[3px] border-gray-300/60 overflow-hidden">
              {/* Notch */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full shadow-inner"></div>
              
              {/* Screen area */}
              <div className="absolute inset-4 top-10 bottom-8 bg-white rounded-[2.2rem] overflow-hidden shadow-lg">
                <div className="w-full h-full scale-90 origin-center flex items-center justify-center">
                  {campaignContent}
                </div>
              </div>
              
              {/* Side buttons */}
              <div className="absolute left-0 top-32 w-1 h-16 bg-gray-400 rounded-r-full shadow-inner"></div>
              <div className="absolute left-0 top-52 w-1 h-12 bg-gray-400 rounded-r-full shadow-inner"></div>
              <div className="absolute left-0 top-68 w-1 h-12 bg-gray-400 rounded-r-full shadow-inner"></div>
              
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 rounded-[3rem] pointer-events-none"></div>
            </div>
            
            {/* Ambient glow */}
            <div className="absolute -inset-12 bg-gradient-radial from-[#951b6d]/20 via-transparent to-transparent opacity-40 blur-xl pointer-events-none group-hover:opacity-70 transition-opacity duration-700"></div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-[#141e29] mb-6 tracking-tight">
          Découvrez votre campagne en action
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed font-light">
          Voici exactement ce que vos utilisateurs verront sur tous leurs appareils. 
          Votre campagne s'adapte parfaitement à chaque écran pour une expérience optimale.
        </p>
      </div>

      {/* Premium Device Selector */}
      <div className="flex justify-center">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-gray-200/50">
          <div className="flex space-x-2">
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
                  className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-500 relative overflow-hidden group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#951b6d] to-[#7d1659] text-white shadow-[0_15px_40px_rgba(149,27,109,0.4)] scale-105'
                      : 'text-gray-600 hover:text-[#951b6d] hover:bg-white/70 hover:shadow-lg'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"></div>
                  )}
                  <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'drop-shadow-sm' : ''}`} />
                  <span className="relative z-10">{device.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cinematic Device Preview */}
      <div className="relative min-h-[700px] flex items-center justify-center py-16">
        {/* Atmospheric background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#951b6d]/3 to-transparent rounded-[4rem]"></div>
        
        {/* Device Showcase */}
        <div className="relative z-10">
          {getDeviceMockup()}
        </div>
      </div>

      {/* Refined Action Controls */}
      <div className="flex justify-center space-x-6">
        <button
          className="flex items-center space-x-3 px-6 py-3 text-gray-500 hover:text-[#951b6d] transition-all duration-300 rounded-xl hover:bg-white/50 hover:shadow-lg group"
          title="Plein écran"
        >
          <Maximize2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Plein écran</span>
        </button>
        <button
          className="flex items-center space-x-3 px-6 py-3 text-gray-500 hover:text-[#951b6d] transition-all duration-300 rounded-xl hover:bg-white/50 hover:shadow-lg group"
          title="Rotation"
        >
          <RotateCw className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-sm font-medium">Rotation</span>
        </button>
      </div>

      {/* Premium Navigation */}
      <div className="flex justify-between pt-12">
        <button 
          onClick={prevStep} 
          className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-200/50"
        >
          Retour
        </button>
        <button 
          onClick={nextStep} 
          className="px-12 py-4 bg-gradient-to-r from-[#951b6d] to-[#7d1659] text-white font-semibold rounded-2xl hover:from-[#7d1659] hover:to-[#6b1248] transition-all duration-300 shadow-[0_15px_40px_rgba(149,27,109,0.4)] hover:shadow-[0_20px_50px_rgba(149,27,109,0.5)] hover:scale-105 transform"
        >
          Publier la campagne
        </button>
      </div>
    </div>
  );
};

export default PreviewStep;
