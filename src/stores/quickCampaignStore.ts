import { create } from 'zustand';

export interface QuickCampaignState {
  currentStep: number;
  campaignName: string;
  selectedGameType: string | null;
  launchDate: string;
  marketingGoal: string;
  logoFile: File | null;
  brandSiteUrl: string;
  logoUrl: string | null;
  fontUrl: string | null;
  selectedTheme: string;
  backgroundImage: File | null;
  backgroundImageUrl: string | null;
  segmentCount: number;
  gamePosition: 'top' | 'center' | 'bottom' | 'left' | 'right';
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
    textColor?: string;
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
  quizQuestions: any[];
  setCurrentStep: (step: number) => void;
  setCampaignName: (name: string) => void;
  setSelectedGameType: (type: string) => void;
  setLaunchDate: (date: string) => void;
  setMarketingGoal: (goal: string) => void;
  setLogoFile: (file: File | null) => void;
  setBrandSiteUrl: (url: string) => void;
  setLogoUrl: (url: string | null) => void;
  setFontUrl: (url: string | null) => void;
  setSelectedTheme: (theme: string) => void;
  setBackgroundImage: (file: File | null) => void;
  setBackgroundImageUrl: (url: string | null) => void;
  setSegmentCount: (count: number) => void;
  setGamePosition: (position: 'top' | 'center' | 'bottom' | 'left' | 'right') => void;
  setCustomColors: (colors: { primary: string; secondary: string; accent: string; textColor?: string }) => void;
  setJackpotColors: (colors: any) => void;
  setQuizQuestions: (questions: any[]) => void;
  generatePreviewCampaign: () => any;
  reset: () => void;
}

export const useQuickCampaignStore = create<QuickCampaignState>((set, get) => ({
  currentStep: 1,
  campaignName: 'Ma Nouvelle Campagne',
  selectedGameType: null,
  launchDate: '',
  marketingGoal: '',
  logoFile: null,
  brandSiteUrl: '',
  logoUrl: null,
  fontUrl: null,
  selectedTheme: 'default',
  backgroundImage: null,
  backgroundImageUrl: null,
  segmentCount: 4,
  gamePosition: 'center',
  customColors: {
    primary: '#ffffff',
    secondary: '#E3F2FD',
    accent: '#ffffff',
    textColor: '#ffffff'
  },
  jackpotColors: {
    containerBackgroundColor: '#1f2937',
    backgroundColor: '#3B82F6',
    borderColor: '#1E40AF',
    borderWidth: 3,
    slotBorderColor: '#60A5FA',
    slotBorderWidth: 2,
    slotBackgroundColor: '#ffffff'
  },
  quizQuestions: [
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

  setCurrentStep: (step) => set({ currentStep: step }),
  setCampaignName: (name) => set({ campaignName: name }),
  setSelectedGameType: (type) => set({ selectedGameType: type }),
  setLaunchDate: (date) => set({ launchDate: date }),
  setMarketingGoal: (goal) => set({ marketingGoal: goal }),
  setLogoFile: (file) => set({ logoFile: file }),
  setBrandSiteUrl: (url) => set({ brandSiteUrl: url }),
  setLogoUrl: (url) => set({ logoUrl: url }),
  setFontUrl: (url) => set({ fontUrl: url }),
  setSelectedTheme: (theme) => set({ selectedTheme: theme }),
  setBackgroundImage: (file) => set({ backgroundImage: file }),
  setBackgroundImageUrl: (url) => set({ backgroundImageUrl: url }),
  setSegmentCount: (count) => set({ segmentCount: count }),
  setGamePosition: (position) => set({ gamePosition: position }),
  setCustomColors: (colors) => set({ customColors: colors }),
  setJackpotColors: (colors) => set({ jackpotColors: colors }),
  setQuizQuestions: (questions) => set({ quizQuestions: questions }),

  generatePreviewCampaign: () => {
    const state = get();

    const baseConfig = {
      id: 'quick-preview',
      name: state.campaignName,
      type: state.selectedGameType || 'wheel',
      design: {
        customColors: state.customColors,
        centerLogo: state.logoUrl || null,
        backgroundImage: state.backgroundImageUrl || null,
        mobileBackgroundImage: state.backgroundImageUrl || null,
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
  },

  reset: () => {
    const url = get().backgroundImageUrl;
    if (url) {
      URL.revokeObjectURL(url);
    }
    set({
      currentStep: 1,
      campaignName: 'Ma Nouvelle Campagne',
      selectedGameType: null,
      launchDate: '',
      marketingGoal: '',
      logoFile: null,
      brandSiteUrl: '',
      logoUrl: null,
      fontUrl: null,
      selectedTheme: 'default',
      backgroundImage: null,
      backgroundImageUrl: null,
      segmentCount: 4,
      gamePosition: 'center',
      customColors: {
        primary: '#ffffff',
        secondary: '#E3F2FD',
        accent: '#ffffff',
        textColor: '#ffffff'
      },
      jackpotColors: {
        containerBackgroundColor: '#1f2937',
        backgroundColor: '#3B82F6',
        borderColor: '#1E40AF',
        borderWidth: 3,
        slotBorderColor: '#60A5FA',
        slotBorderWidth: 2,
        slotBackgroundColor: '#ffffff'
      },
      quizQuestions: [
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
      ]
    })
  }
}));
