import React from 'react';
import { useGamePositionCalculator } from '../../CampaignEditor/GamePositionCalculator';
import useCenteredStyles from '../../../hooks/useCenteredStyles';
import { synchronizeCampaignWithColors } from './utils/campaignSynchronizer';
import GameSwitcher from './components/GameSwitcher';

interface GameRendererProps {
  gameType: string;
  mockCampaign: any;
  customColors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  jackpotColors: {
    containerBackgroundColor: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    slotBorderColor: string;
    slotBorderWidth: number;
    slotBackgroundColor: string;
  };
  logoUrl?: string;
  fontUrl?: string;
  gameSize?: 'small' | 'medium' | 'large' | 'xlarge';
  gamePosition?: 'top' | 'center' | 'bottom' | 'left' | 'right';
  previewDevice?: 'desktop' | 'tablet' | 'mobile';
}

const GameRenderer: React.FC<GameRendererProps> = ({
  gameType,
  mockCampaign,
  customColors,
  jackpotColors,
  logoUrl,
  fontUrl,
  gameSize = 'large',
  gamePosition = 'center',
  previewDevice = 'desktop'
}) => {
  // Couleurs directement issues du logo
  const finalColors = customColors;

  // Chargement dynamique de la police
  React.useEffect(() => {
    if (fontUrl) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontUrl;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [fontUrl]);

  // Synchronisation de la campagne avec les couleurs extraites
  const synchronizedCampaign = React.useMemo(() => {
    return synchronizeCampaignWithColors(mockCampaign, finalColors, logoUrl);
  }, [mockCampaign, finalColors, logoUrl]);

  // Styles et positionnement
  const { containerStyle, wrapperStyle } = useCenteredStyles();
  const { getPositionStyles } = useGamePositionCalculator({
    gameSize,
    gamePosition,
    shouldCropWheel: false
  });

  // Clé de rendu forcé pour la mise à jour des couleurs
  const renderKey = `${gameType}-${JSON.stringify(finalColors)}-${Date.now()}`;

  return (
    <GameSwitcher
      gameType={gameType}
      synchronizedCampaign={synchronizedCampaign}
      mockCampaign={mockCampaign}
      finalColors={finalColors}
      jackpotColors={jackpotColors}
      gameSize={gameSize}
      gamePosition={gamePosition}
      previewDevice={previewDevice}
      containerStyle={containerStyle}
      wrapperStyle={wrapperStyle}
      getPositionStyles={getPositionStyles}
      renderKey={renderKey}
    />
  );
};

export default GameRenderer;
