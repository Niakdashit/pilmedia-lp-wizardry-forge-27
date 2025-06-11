import React from 'react';
import WheelPreview from '../../GameTypes/WheelPreview';
import { Jackpot } from '../../GameTypes';
import ScratchPreview from '../../GameTypes/ScratchPreview';
import DicePreview from '../../GameTypes/DicePreview';
import FormPreview from '../../GameTypes/FormPreview';
import { applyBrandStyleToWheel, BrandColors, extractColorsFromLogo, generateBrandThemeFromColors, analyzeBrandStyle } from '../../../utils/BrandStyleAnalyzer';
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
  siteUrl?: string;
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
  siteUrl,
  gameSize = 'large',
  gamePosition = 'center',
  previewDevice = 'desktop'
}) => {
  const [siteColors, setSiteColors] = React.useState<string[]>([]);
  const [logoColors, setLogoColors] = React.useState<string[]>([]);
  const [finalColors, setFinalColors] = React.useState(customColors);

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

  // Extraire les couleurs du site web
  React.useEffect(() => {
    const extractSiteColors = async () => {
      if (siteUrl && typeof window !== 'undefined') {
        try {
          console.log('Analyse des couleurs du site:', siteUrl);
          const brandStyle = await analyzeBrandStyle(siteUrl);
          console.log('Style de marque extrait:', brandStyle);
          
          if (brandStyle.primaryColor && brandStyle.secondaryColor) {
            const colors = [
              brandStyle.primaryColor,
              brandStyle.secondaryColor,
              brandStyle.lightColor,
              brandStyle.darkColor
            ].filter(Boolean);
            console.log('Couleurs du site extraites:', colors);
            setSiteColors(colors);
          }
        } catch (error) {
          console.log('Impossible d\'analyser les couleurs du site:', error);
        }
      }
    };

    extractSiteColors();
  }, [siteUrl]);

  // Extraire les couleurs du logo (fallback)
  React.useEffect(() => {
    const extractLogoColors = async () => {
      if (logoUrl && typeof window !== 'undefined') {
        try {
          console.log('Extraction des couleurs du logo:', logoUrl);
          const colors = await extractColorsFromLogo(logoUrl);
          console.log('Couleurs extraites du logo:', colors);
          setLogoColors(colors);
        } catch (error) {
          console.log('Impossible d\'extraire les couleurs du logo:', error);
        }
      }
    };

    extractLogoColors();
  }, [logoUrl]);

  // Calculer les couleurs finales à utiliser
  React.useEffect(() => {
    // Si les couleurs personnalisées sont définies et non-génériques, les utiliser
    if (customColors.primary && customColors.primary !== '#841b60' && customColors.primary !== '#3B82F6') {
      console.log('Utilisation des couleurs personnalisées:', customColors);
      setFinalColors(customColors);
      return;
    }

    // Priorité 1: Couleurs extraites du site web
    if (siteColors.length >= 2) {
      console.log('Génération du thème à partir des couleurs du site:', siteColors);
      const palette = generateBrandThemeFromColors(siteColors);
      const newColors = {
        primary: palette.primaryColor,
        secondary: palette.secondaryColor,
        accent: palette.accentColor
      };
      console.log('Nouvelles couleurs générées depuis le site:', newColors);
      setFinalColors(newColors);
      return;
    }

    // Fallback: Couleurs extraites du logo
    if (logoColors.length >= 2) {
      console.log('Génération du thème à partir des couleurs du logo:', logoColors);
      const palette = generateBrandThemeFromColors(logoColors);
      const newColors = {
        primary: palette.primaryColor,
        secondary: palette.secondaryColor,
        accent: palette.accentColor
      };
      console.log('Nouvelles couleurs générées depuis le logo:', newColors);
      setFinalColors(newColors);
      return;
    }

    // Fallback final sur les couleurs par défaut
    console.log('Utilisation des couleurs par défaut:', customColors);
    setFinalColors(customColors);
  }, [customColors, siteColors, logoColors]);

  // Application de la charte de marque sur la roue et le design général
  const synchronizedCampaign = React.useMemo(() => {
    console.log('Application des couleurs finales à la campagne:', finalColors);
    const campaign = applyBrandStyleToWheel(mockCampaign, finalColors as BrandColors);
    
    // Forcer l'application des couleurs finales à la configuration de la roue
    if (campaign.config?.roulette) {
      campaign.config.roulette = {
        ...campaign.config.roulette,
        borderColor: finalColors.primary,
        borderOutlineColor: finalColors.accent || finalColors.secondary,
        segmentColor1: finalColors.primary,
        segmentColor2: finalColors.secondary,
        // Mettre à jour les segments existants avec les nouvelles couleurs
        segments: campaign.config.roulette.segments?.map((segment: any, index: number) => ({
          ...segment,
          color: index % 2 === 0 ? finalColors.primary : finalColors.secondary
        })) || []
      };
    }

    // Forcer l'application des couleurs au design
    campaign.design = {
      ...campaign.design,
      centerLogo: logoUrl || campaign.design?.centerLogo,
      customColors: finalColors
    };

    // Mettre à jour la configuration du bouton avec les couleurs finales
    campaign.buttonConfig = {
      ...campaign.buttonConfig,
      color: finalColors.accent || finalColors.primary,
      borderColor: finalColors.primary,
      textColor: '#ffffff'
    };

    console.log('Campagne synchronisée:', campaign);
    return campaign;
  }, [mockCampaign, finalColors, logoUrl]);

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
