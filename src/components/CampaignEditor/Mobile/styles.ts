
interface MobileConfig {
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundMode?: string;
  fontFamily?: string;
  verticalSpacing?: number;
  horizontalPadding?: number;
  buttonPlacement?: string;
  gamePosition?: string;
}

export const getDeviceStyle = (specs: any, deviceWidth: number) => ({
  width: deviceWidth,
  height: specs.height,
  borderRadius: specs.borderRadius,
  border: specs.border,
  boxShadow: specs.boxShadow,
  backgroundColor: '#000',
  overflow: 'hidden',
  position: 'relative' as const,
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  margin: '0 auto'
});

export const getScreenStyle = (mobileConfig: MobileConfig, previewMode: string): React.CSSProperties => {
  const screenStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: (previewMode === 'mobile' ? 16 : 16),
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: mobileConfig.backgroundColor || '#ebf4f7',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: mobileConfig.fontFamily || 'Inter'
  };

  if (mobileConfig.backgroundImage) {
    screenStyle.backgroundImage = `url(${mobileConfig.backgroundImage})`;
    screenStyle.backgroundSize = mobileConfig.backgroundMode === 'contain' ? 'contain' : 'cover';
    screenStyle.backgroundPosition = 'center';
    screenStyle.backgroundRepeat = 'no-repeat';
  }

  return screenStyle;
};

export const getContentLayoutStyle = (mobileConfig: MobileConfig) => {
  const verticalSpacing = mobileConfig.verticalSpacing ?? 20;
  const horizontalPadding = Math.max(12, mobileConfig.horizontalPadding ?? 16);
  const gamePosition = mobileConfig.gamePosition || 'left';

  return {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: gamePosition === 'top' ? 'flex-end' : 
                    gamePosition === 'bottom' ? 'flex-start' : 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    gap: verticalSpacing,
    padding: `${verticalSpacing}px ${horizontalPadding}px`,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
    position: 'relative' as const,
    zIndex: 5,
    paddingTop: mobileConfig.buttonPlacement === 'top' ? '80px' : `${verticalSpacing}px`,
    paddingBottom: mobileConfig.buttonPlacement === 'bottom' ? '80px' : `${verticalSpacing}px`
  };
};

export const getTextBlockStyle = () => ({
  textAlign: 'center' as const,
  width: '100%',
  maxWidth: '100%',
  flexShrink: 0,
  overflowWrap: 'break-word' as const,
  wordBreak: 'break-word' as const
});
