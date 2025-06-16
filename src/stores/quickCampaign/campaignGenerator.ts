
import { QuickCampaignState } from '../../types/quickCampaign';

export const generatePreviewCampaign = (state: QuickCampaignState) => {
  const baseConfig = {
    id: 'quick-preview',
    name: state.campaignName,
    type: state.selectedGameType || 'wheel',
    design: {
      customColors: state.customColors,
      centerLogo: state.logoUrl || null,
      backgroundImage: state.backgroundImageUrl || null,
      mobileBackgroundImage: state.backgroundImageUrl || null,
      background: state.backgroundImageUrl ? 'transparent' : '#f9fafb'
    },
    buttonConfig: {
      color: state.customColors.accent,
      textColor: state.customColors.primary,
      borderColor: state.customColors.primary,
      borderWidth: 2,
      borderRadius: 8,
      size: 'medium',
      text: 'Jouer maintenant !',
      visible: true
    },
    config: {
      roulette: {}
    },
    gameConfig: {},
    mobileConfig: {}
  };

  // Configuration pour la roue
  if (state.selectedGameType === 'wheel') {
    baseConfig.config.roulette = {
      segments: Array.from({ length: state.segmentCount }).map((_, i) => ({
        label: '',
        color: i % 2 === 0 ? state.customColors.primary : state.customColors.secondary,
        image: null
      })),
      borderColor: state.customColors.secondary,
      borderOutlineColor: state.customColors.accent,
      segmentColor1: state.customColors.primary,
      segmentColor2: state.customColors.secondary,
      theme: state.selectedTheme
    };

    baseConfig.gameConfig = {
      wheel: {
        mode: 'instant_winner',
        winProbability: 0.1,
        maxWinners: 10,
        winnersCount: 0
      }
    };
  }

  // Configuration pour le jackpot
  if (state.selectedGameType === 'jackpot') {
    baseConfig.gameConfig = {
      jackpot: {
        instantWin: {
          mode: 'instant_winner',
          winProbability: 0.1,
          maxWinners: 10,
          winnersCount: 0
        },
        buttonLabel: 'Lancer le Jackpot',
        ...state.jackpotColors
      }
    };
  }

  // Configuration mobile
  baseConfig.mobileConfig = {
    roulette: baseConfig.config.roulette,
    buttonColor: state.customColors.accent,
    buttonTextColor: state.customColors.primary,
    buttonPlacement: 'bottom',
    gamePosition: 'center',
    backgroundImage: state.backgroundImageUrl || null
  };

  return baseConfig;
};
