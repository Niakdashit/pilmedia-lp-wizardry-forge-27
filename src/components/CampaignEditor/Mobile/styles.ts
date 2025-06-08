
import { PREVIEW_CONTAINER_SPECS, MOBILE_FORMAT_SPECS } from './constants';

export const getDeviceStyle = (dims?: { width: number; height: number }) => ({
  width: dims?.width || PREVIEW_CONTAINER_SPECS.mobile.width,
  height: dims?.height || PREVIEW_CONTAINER_SPECS.mobile.height,
  backgroundColor: '#1f2937',
  borderRadius: '24px',
  padding: '8px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  position: 'relative' as const,
  overflow: 'hidden'
});

export const getScreenStyle = (
  mobileConfig: any,
  dims?: { width: number; height: number }
) => ({
  width: '100%',
  height: '100%',
  backgroundColor: mobileConfig.backgroundColor || '#ebf4f7',
  backgroundImage: mobileConfig.backgroundImage ? `url(${mobileConfig.backgroundImage})` : undefined,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  borderRadius: '16px',
  position: 'relative' as const,
  overflow: 'auto',
  aspectRatio: `${dims?.width || MOBILE_FORMAT_SPECS.width} / ${dims?.height ||
    MOBILE_FORMAT_SPECS.height}`
});

export const getContentLayoutStyle = (mobileConfig: any) => {
  const position = mobileConfig.textPosition || 'top';
  const spacing = mobileConfig.verticalSpacing || 20;
  const padding = mobileConfig.horizontalPadding || 16;
  
  return {
    position: 'absolute' as const,
    left: padding,
    right: padding,
    zIndex: 5,
    ...(position === 'top' && { top: spacing }),
    ...(position === 'center' && { 
      top: '50%', 
      transform: 'translateY(-50%)' 
    }),
    ...(position === 'bottom' && { bottom: spacing }),
    pointerEvents: 'none' as const
  };
};

export const getTextBlockStyle = () => ({
  width: '100%'
});
