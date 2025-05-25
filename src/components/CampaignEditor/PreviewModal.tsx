import React, { useState } from 'react';
import { X, Smartphone, Monitor } from 'lucide-react';
import { useSpring, animated } from 'react-spring';
import confetti from 'canvas-confetti';
import { useWindowSize } from 'react-use';
import PreviewContent from './PreviewContent';
import Color from 'color';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, campaign }) => {
  const [step, setStep] = useState<'start' | 'game' | 'end'>('start');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const { width } = useWindowSize();

  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
    config: { tension: 280, friction: 20 }
  });

  const contentSpring = useSpring({
    opacity: 1,
    transform: 'translateX(0%)',
    from: { opacity: 0, transform: 'translateX(50%)' },
    reset: true,
    key: step
  });

  const getContrastColor = (bgColor: string) => {
    try {
      const color = Color(bgColor);
      return color.isLight() ? '#000000' : '#FFFFFF';
    } catch {
      return '#000000';
    }
  };

  const getPositionStyles = (position: string) => {
    const styles: React.CSSProperties = {
      position: 'absolute',
      maxWidth: '100%',
      padding: '1rem',
    };

    switch (position) {
      case 'top-left':
        return { ...styles, top: '1rem', left: '1rem' };
      case 'top-center':
        return { ...styles, top: '1rem', left: '50%', transform: 'translateX(-50%)' };
      case 'top-right':
        return { ...styles, top: '1rem', right: '1rem' };
      case 'center-left':
        return { ...styles, top: '50%', left: '1rem', transform: 'translateY(-50%)' };
      case 'center-center':
        return { ...styles, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      case 'center-right':
        return { ...styles, top: '50%', right: '1rem', transform: 'translateY(-50%)' };
      case 'bottom-left':
        return { ...styles, bottom: '1rem', left: '1rem' };
      case 'bottom-center':
        return { ...styles, bottom: '1rem', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-right':
        return { ...styles, bottom: '1rem', right: '1rem' };
      default:
        return { ...styles, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  const getFrameStyle = (screenNumber: number) => {
    const screenConfig = campaign.screens?.[screenNumber];
    const frameConfig = screenConfig?.frame;
    
    if (frameConfig?.show === false) {
      return {};
    }

    return {
      maxWidth: `${frameConfig?.maxWidth || campaign.design.frame?.maxWidth || 800}px`,
      maxHeight: `${frameConfig?.maxHeight || campaign.design.frame?.maxHeight || 90}%`,
      padding: `${frameConfig?.padding || campaign.design.frame?.padding || 24}px`,
      backgroundColor: Color(campaign.design.blockColor || '#FFFFFF').alpha(0.9).toString(),
      backdropFilter: 'blur(px)',
      borderRadius: campaign.design.borderRadius || '0.5rem',
      boxShadow: campaign.design.shadow === 'shadow-xl' 
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        : campaign.design.shadow === 'shadow-md'
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        : 'none',
      border: `1px solid ${campaign.design.borderColor || '#E5E7EB'}`,
      ...getPositionStyles(frameConfig?.position || 'center-center')
    };
  };

  const handleStart = () => {
    setStep('game');
  };

  const handleGameComplete = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setStep('end');
  };

  const handleReplay = () => {
    setStep('start');
  };

  if (!isOpen) return null;

  const containerStyle = {
    backgroundImage: campaign.design.backgroundImage ? `url(${campaign.design.backgroundImage})` : undefined,
    backgroundColor: campaign.design.background,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const controlsStyle = {
    backgroundColor: 'transparent',
    borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
    backdropFilter: 'blur(8px)',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <animated.div 
        style={{
          ...modalSpring,
          ...containerStyle
        }}
        className={`rounded-lg shadow-xl ${
          viewMode === 'mobile' ? 'w-[375px]' : 'w-[105vw]'
        } h-[105vh] flex flex-col`}
      >
        <div className="flex items-center justify-between p-4" style={controlsStyle}>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-lg ${
                viewMode === 'desktop' 
                  ? 'bg-[#841b60] text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Monitor className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-lg ${
                viewMode === 'mobile' 
                  ? 'bg-[#841b60] text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Smartphone className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 relative">
          <animated.div style={contentSpring} className="h-full">
            {step === 'start' && campaign.screens?.[1] && (
              <div style={getFrameStyle(1)}>
                {campaign.screens[1].showTitle !== false && (
                  <h2 
                    className="text-2xl font-bold mb-6"
                    style={{ 
                      color: campaign.design.titleColor,
                      fontFamily: campaign.design.titleFont
                    }}
                  >
                    {campaign.screens[1].title}
                  </h2>
                )}
                
                {campaign.screens[1].showDescription !== false && (
                  <p 
                    className="mb-8"
                    style={{ 
                      color: getContrastColor(campaign.design.blockColor),
                      fontFamily: campaign.design.textFont
                    }}
                  >
                    {campaign.screens[1].description}
                  </p>
                )}

                <button
                  onClick={handleStart}
                  className="px-8 py-3 font-medium transition-colors duration-200"
                  style={{
                    backgroundColor: campaign.design.buttonColor,
                    color: getContrastColor(campaign.design.buttonColor),
                    borderRadius: campaign.design.borderRadius,
                    fontFamily: campaign.design.textFont
                  }}
                >
                  {campaign.screens[1].buttonText || 'Participer'}
                </button>
              </div>
            )}

            {step === 'game' && (
              <div style={getFrameStyle(2)}>
                <PreviewContent 
                  campaign={campaign} 
                  step={step}
                  onComplete={handleGameComplete}
                />
              </div>
            )}

            {step === 'end' && campaign.screens?.[3] && (
              <div style={getFrameStyle(3)}>
                {campaign.screens[3].showTitle !== false && (
                  <h2 
                    className="text-3xl font-bold mb-4"
                    style={{ 
                      color: campaign.design.titleColor,
                      fontFamily: campaign.design.titleFont
                    }}
                  >
                    {campaign.screens[3].title}
                  </h2>
                )}
                
                {campaign.screens[3].showDescription !== false && (
                  <p 
                    className="text-xl mb-8"
                    style={{ 
                      color: getContrastColor(campaign.design.blockColor),
                      fontFamily: campaign.design.textFont
                    }}
                  >
                    {campaign.screens[3].description}
                  </p>
                )}

                {campaign.screens[3].showReplayButton !== false && (
                  <button
                    onClick={handleReplay}
                    className="px-6 py-2 font-medium transition-colors duration-200"
                    style={{
                      backgroundColor: campaign.design.buttonColor,
                      color: getContrastColor(campaign.design.buttonColor),
                      borderRadius: campaign.design.borderRadius,
                      fontFamily: campaign.design.textFont
                    }}
                  >
                    {campaign.screens[3].buttonText || 'Rejouer'}
                  </button>
                )}
              </div>
            )}
          </animated.div>
        </div>
      </animated.div>
    </div>
  );
};

export default PreviewModal;