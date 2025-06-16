export const getWheelPreviewConfig = (campaign: any) => {
  const position = campaign?.gameConfig?.wheel?.position || 'centre';
  const centerImage = campaign?.gameConfig?.wheel?.centerImage;
  const centerLogo = campaign?.design?.centerLogo || campaign?.gameConfig?.wheel?.centerImage;
  const theme = campaign?.gameConfig?.wheel?.theme || 'default';

  const borderColor = campaign?.gameConfig?.wheel?.borderColor || '#841b60';
  const borderOutlineColor = campaign?.gameConfig?.wheel?.borderOutlineColor || '#FFD700';

  const customColors = campaign?.design?.customColors;

  const buttonConfig = campaign?.buttonConfig || {
    color: customColors?.primary || '#841b60',
    textColor: customColors?.primary || '#ffffff',
    borderColor: customColors?.primary || '#841b60',
    borderWidth: 1,
    borderRadius: 8,
    size: 'medium',
    link: '',
    visible: true,
    text: 'Remplir le formulaire'
  };

  return {
    position,
    centerImage,
    centerLogo,
    theme,
    borderColor,
    borderOutlineColor,
    customColors,
    buttonConfig
  };
};