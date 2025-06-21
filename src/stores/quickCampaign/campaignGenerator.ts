
import { QuickCampaignState } from './types';

export const generatePreviewCampaign = (state: QuickCampaignState) => {
  const baseConfig = {
    id: 'preview-campaign',
    name: state.campaignName,
    type: state.selectedGameType,
    status: 'draft',
    formFields: [
      { id: 'prenom', label: 'Prénom', type: 'text', required: true },
      { id: 'nom', label: 'Nom', type: 'text', required: true },
      { id: 'email', label: 'Email', type: 'email', required: true }
    ],
    gamePosition: state.gamePosition,
    design: {
      background: state.backgroundImageUrl || '#f8fafc',
      backgroundImage: state.backgroundImageUrl,
      mobileBackgroundImage: state.backgroundImageUrl,
      customColors: state.customColors,
      primaryColor: state.customColors.primary,
      secondaryColor: state.customColors.secondary,
      titleColor: '#000000',
      buttonColor: state.customColors.primary,
      borderRadius: '0.5rem',
      fontFamily: 'Inter'
    },
    buttonConfig: {
      color: state.customColors.primary,
      borderColor: state.customColors.primary,
      borderWidth: 1,
      borderRadius: 8,
      size: 'medium',
      text: 'Participer',
      visible: true
    },
    screens: {
      1: {
        title: 'Bienvenue !',
        description: 'Participez à notre jeu et tentez de gagner !',
        buttonText: 'Participer',
        showTitle: true,
        showDescription: true
      },
      3: {
        title: 'Félicitations !',
        description: 'Merci pour votre participation !',
        showTitle: true,
        showDescription: true
      }
    },
    mobileConfig: {
      gamePosition: state.gamePosition
    }
  };

  // Configuration spécifique par type de jeu
  const gameConfigs: Record<string, any> = {
    wheel: {
      winProbability: 0.1,
      maxWinners: 10,
      segments: Array.from({ length: state.segmentCount }, (_, i) => ({
        id: i + 1,
        label: `Prix ${i + 1}`,
        value: `Segment ${i + 1}`,
        color: i % 2 === 0 ? state.customColors.primary : state.customColors.secondary,
        isWinning: i < 2
      })),
      buttonLabel: 'Tourner la roue',
      buttonColor: state.customColors.primary
    },
    jackpot: {
      instantWin: {
        mode: 'instant_winner',
        winProbability: 0.1,
        maxWinners: 10,
        winnersCount: 0
      },
      ...state.jackpotColors,
      buttonLabel: 'Lancer le Jackpot',
      buttonColor: state.customColors.primary
    },
    quiz: {
      questions: state.quizQuestions.length > 0 ? state.quizQuestions : [
        {
          id: 1,
          text: 'Quelle est votre couleur préférée ?',
          type: 'multiple',
          options: [
            { id: 1, text: 'Rouge', isCorrect: false },
            { id: 2, text: 'Bleu', isCorrect: true },
            { id: 3, text: 'Vert', isCorrect: false },
            { id: 4, text: 'Jaune', isCorrect: false }
          ],
          feedback: {
            correct: 'Excellent choix !',
            incorrect: 'Dommage, essayez encore !'
          }
        }
      ],
      buttonLabel: 'Répondre',
      buttonColor: state.customColors.primary
    },
    scratch: {
      prizes: [
        { id: 1, label: 'Gagnant !', probability: 0.1 },
        { id: 2, label: 'Perdu', probability: 0.9 }
      ],
      buttonLabel: 'Gratter',
      buttonColor: state.customColors.primary,
      scratchArea: {
        width: 300,
        height: 200,
        revealPercentage: 50
      }
    },
    dice: {
      winningNumbers: [6],
      maxRolls: 3,
      buttonLabel: 'Lancer les dés',
      buttonColor: state.customColors.primary
    },
    memory: {
      gridSize: 4,
      timeLimit: 60,
      pairs: 8,
      buttonLabel: 'Commencer',
      buttonColor: state.customColors.primary
    },
    puzzle: {
      pieces: 16,
      timeLimit: 120,
      buttonLabel: 'Commencer le puzzle',
      buttonColor: state.customColors.primary
    },
    form: {
      fields: baseConfig.formFields,
      buttonLabel: 'Envoyer',
      buttonColor: state.customColors.primary
    }
  };

  return {
    ...baseConfig,
    gameConfig: {
      [state.selectedGameType || 'wheel']: gameConfigs[state.selectedGameType || 'wheel'] || gameConfigs.wheel
    },
    config: {
      roulette: gameConfigs[state.selectedGameType || 'wheel'] || gameConfigs.wheel
    },
    funnel: state.selectedGameType && ['wheel', 'scratch', 'jackpot', 'dice'].includes(state.selectedGameType) 
      ? 'unlocked_game' 
      : 'standard'
  };
};
