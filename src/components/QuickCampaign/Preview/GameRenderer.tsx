
import React from 'react';
import WheelPreview from '../../GameTypes/WheelPreview';
import { Jackpot } from '../../GameTypes';
import ScratchPreview from '../../GameTypes/ScratchPreview';
import DicePreview from '../../GameTypes/DicePreview';
import FormPreview from '../../GameTypes/FormPreview';
import { applyBrandStyleToWheel, BrandColors, extractColorsFromLogo, generateBrandThemeFromColors } from '../../../utils/BrandStyleAnalyzer';
import { useGamePositionCalculator } from '../../CampaignEditor/GamePositionCalculator';
import useCenteredStyles from '../../../hooks/useCenteredStyles';

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
  const [logoColors, setLogoColors] = React.useState<string[]>([]);

  // Charger dynamiquement la police de marque si fournie
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

  // Extraire les couleurs du logo comme fallback
  React.useEffect(() => {
    const extractLogoColors = async () => {
      if (logoUrl && typeof window !== 'undefined') {
        try {
          const colors = await extractColorsFromLogo(logoUrl);
          setLogoColors(colors);
        } catch (error) {
          console.log('Impossible d\'extraire les couleurs du logo:', error);
        }
      }
    };

    extractLogoColors();
  }, [logoUrl]);

  // Utiliser les couleurs personnalisées ou fallback sur les couleurs du logo
  const finalColors = React.useMemo(() => {
    // Si les couleurs personnalisées sont définies et non-génériques, les utiliser
    if (customColors.primary && customColors.primary !== '#841b60') {
      return customColors;
    }

    // Sinon, utiliser les couleurs extraites du logo
    if (logoColors.length >= 2) {
      const palette = generateBrandThemeFromColors(logoColors);
      return {
        primary: palette.primaryColor,
        secondary: palette.secondaryColor,
        accent: palette.accentColor
      };
    }

    // Fallback sur les couleurs par défaut
    return customColors;
  }, [customColors, logoColors]);

  // Application de la charte de marque sur la roue et le design général
  const synchronizedCampaign = applyBrandStyleToWheel(mockCampaign, finalColors as BrandColors);
  
  // Forcer l'application des couleurs finales à la configuration de la roue
  if (synchronizedCampaign.config?.roulette) {
    synchronizedCampaign.config.roulette = {
      ...synchronizedCampaign.config.roulette,
      borderColor: finalColors.primary,
      borderOutlineColor: finalColors.accent || finalColors.secondary,
      segmentColor1: finalColors.primary,
      segmentColor2: finalColors.secondary,
      // Mettre à jour les segments existants avec les nouvelles couleurs
      segments: synchronizedCampaign.config.roulette.segments?.map((segment: any, index: number) => ({
        ...segment,
        color: index % 2 === 0 ? finalColors.primary : finalColors.secondary
      })) || []
    };
  }

  // Forcer l'application des couleurs au design
  synchronizedCampaign.design = {
    ...synchronizedCampaign.design,
    centerLogo: logoUrl || synchronizedCampaign.design?.centerLogo,
    customColors: finalColors
  };

  // Mettre à jour la configuration du bouton avec les couleurs finales
  synchronizedCampaign.buttonConfig = {
    ...synchronizedCampaign.buttonConfig,
    color: finalColors.accent || finalColors.primary,
    borderColor: finalColors.primary,
    textColor: '#ffffff'
  };

  const { containerStyle, wrapperStyle } = useCenteredStyles();
  const { getPositionStyles } = useGamePositionCalculator({
    gameSize,
    gamePosition,
    shouldCropWheel: false
  });

  switch (gameType) {
    case 'wheel':
      return (
        <div style={{ ...containerStyle, minHeight: '400px', padding: '20px', boxSizing: 'border-box' }}>
          <div style={{ ...wrapperStyle, ...getPositionStyles() }}>
            <WheelPreview
              campaign={synchronizedCampaign}
              config={mockCampaign.gameConfig?.wheel || {
                mode: "instant_winner" as const,
                winProbability: 0.1,
                maxWinners: 10,
                winnersCount: 0
              }}
              gameSize={gameSize}
              gamePosition={gamePosition}
              previewDevice={previewDevice}
              key={`wheel-${JSON.stringify(finalColors)}-${Date.now()}`}
            />
          </div>
        </div>
      );
    case 'jackpot':
      return (
        <div style={{ ...containerStyle, minHeight: '400px', padding: '20px', boxSizing: 'border-box' }}>
          <div style={{ ...wrapperStyle, ...getPositionStyles() }}>
            <Jackpot
              isPreview={true}
              instantWinConfig={mockCampaign.gameConfig?.jackpot?.instantWin || {
                mode: "instant_winner" as const,
                winProbability: 0.1,
                maxWinners: 10,
                winnersCount: 0
              }}
              buttonLabel={mockCampaign.gameConfig?.jackpot?.buttonLabel || mockCampaign.buttonConfig?.text || 'Lancer le Jackpot'}
              buttonColor={finalColors.primary}
              backgroundImage={mockCampaign.gameConfig?.jackpot?.backgroundImage}
              containerBackgroundColor={jackpotColors.containerBackgroundColor}
              backgroundColor={jackpotColors.backgroundColor}
              borderColor={jackpotColors.borderColor}
              borderWidth={jackpotColors.borderWidth}
              slotBorderColor={jackpotColors.slotBorderColor}
              slotBorderWidth={jackpotColors.slotBorderWidth}
              slotBackgroundColor={jackpotColors.slotBackgroundColor}
            />
          </div>
        </div>
      );
    case 'scratch':
      return (
        <div style={{ ...containerStyle, minHeight: '400px', padding: '20px', boxSizing: 'border-box' }}>
          <div style={{ ...wrapperStyle, ...getPositionStyles() }}>
            <ScratchPreview
              config={mockCampaign.gameConfig?.scratch || {}}
              autoStart
            />
          </div>
        </div>
      );
    case 'dice':
      return (
        <div style={{ ...containerStyle, minHeight: '400px', padding: '20px', boxSizing: 'border-box' }}>
          <div style={{ ...wrapperStyle, ...getPositionStyles() }}>
            <DicePreview
              config={mockCampaign.gameConfig?.dice || {}}
            />
          </div>
        </div>
      );
    case 'form':
      return (
        <div style={{ ...containerStyle, minHeight: '400px', padding: '20px', boxSizing: 'border-box' }}>
          <div style={{ ...wrapperStyle, ...getPositionStyles() }}>
            <FormPreview
              campaign={synchronizedCampaign}
              gameSize={gameSize}
            />
          </div>
        </div>
      );
    default:
      return (
        <div style={{ ...containerStyle, minHeight: '400px', padding: '20px', boxSizing: 'border-box' }}>
          <div style={{ ...wrapperStyle, ...getPositionStyles() }}>
            <div className="text-center text-gray-500">
              <p>Type de jeu non supporté: {gameType}</p>
            </div>
          </div>
        </div>
      );
  }
};

export default GameRenderer;
