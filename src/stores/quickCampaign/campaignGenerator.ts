
import { QuickCampaignState } from './types';

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
      pointerImage: state.pointerImageUrl || null,
      containerBackgroundColor: '#ffffff',
      borderColor: state.customColors.primary,
      borderRadius: '16px',
      buttonColor: state.customColors.accent,
      buttonTextColor: state.customColors.primary,
      textColor: state.customColors.textColor || '#000000'
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
    screens: [
      {
        title: 'Prêt à jouer ?',
        description: 'Participez à notre jeu et tentez de gagner des prix !',
        buttonText: 'Participer'
      },
      {
        title: 'Vos informations',
        description: 'Remplissez le formulaire pour continuer',
        buttonText: "C'est parti !"
      },
      {
        title: 'Jouez maintenant !',
        description: 'Bonne chance !',
        buttonText: 'Jouer'
      },
      {
        title: 'Merci !',
        description: 'Merci pour votre participation !',
        confirmationTitle: 'Félicitations !',
        confirmationMessage: 'Votre participation a été enregistrée.',
        replayButtonText: 'Rejouer',
        winMessage: 'Bravo ! Vous avez gagné !',
        loseMessage: 'Pas de chance cette fois !'
      }
    ],
    config: {
      roulette: {}
    },
    gameConfig: {},
    mobileConfig: {
      gamePosition: state.gamePosition,
      buttonColor: state.customColors.accent,
      buttonTextColor: state.customColors.primary,
      buttonPlacement: 'bottom'
    }
  };

  // Roue
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

  // Quiz
  if (state.selectedGameType === 'quiz') {
    baseConfig.gameConfig = {
      quiz: {
        questions: state.quizQuestions,
        timePerQuestion: 30,
        buttonLabel: 'Commencer le Quiz',
        buttonColor: state.customColors.accent
      }
    };
  }

  // Jackpot
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

  // Scratch
  if (state.selectedGameType === 'scratch') {
    baseConfig.gameConfig = {
      scratch: {
        cards: [
          {
            id: 1,
            revealImage: '',
            revealMessage: 'Félicitations !',
            scratchColor: '#C0C0C0'
          }
        ],
        buttonLabel: 'Gratter',
        winMessage: 'Bravo ! Vous avez gagné !',
        loseMessage: 'Pas de chance cette fois !'
      }
    };
  }

  return baseConfig;
};
