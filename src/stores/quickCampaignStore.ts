
import { create } from 'zustand';

interface QuickCampaignState {
  // Étape 1 - Choix de la mécanique
  selectedGameType: string | null;
  
  // Étape 2 - Paramètres essentiels
  campaignName: string;
  launchDate: string;
  marketingGoal: string;
  logoFile: File | null;
  
  // Étape 3 - Style visuel
  selectedTheme: string | null;
  backgroundImage: File | null;
  
  // Nouvelles options de couleurs personnalisées
  customColors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  segmentCount: number;
  
  // État général
  currentStep: number;
  
  // Actions
  setGameType: (type: string) => void;
  setCampaignName: (name: string) => void;
  setLaunchDate: (date: string) => void;
  setMarketingGoal: (goal: string) => void;
  setLogoFile: (file: File | null) => void;
  setSelectedTheme: (theme: string) => void;
  setBackgroundImage: (file: File | null) => void;
  setCustomColors: (colors: { primary: string; secondary: string; accent?: string }) => void;
  setSegmentCount: (count: number) => void;
  setCurrentStep: (step: number) => void;
  reset: () => void;
  
  // Nouvelle méthode pour générer les données de campagne pour l'aperçu
  generatePreviewCampaign: () => any;
}

export const useQuickCampaignStore = create<QuickCampaignState>((set, get) => ({
  // État initial
  selectedGameType: null,
  campaignName: '',
  launchDate: '',
  marketingGoal: '',
  logoFile: null,
  selectedTheme: null,
  backgroundImage: null,
  customColors: {
    primary: '#841b60',
    secondary: '#3b82f6',
    accent: '#10b981'
  },
  segmentCount: 6,
  currentStep: 1,
  
  // Actions
  setGameType: (type) => set({ selectedGameType: type }),
  setCampaignName: (name) => set({ campaignName: name }),
  setLaunchDate: (date) => set({ launchDate: date }),
  setMarketingGoal: (goal) => set({ marketingGoal: goal }),
  setLogoFile: (file) => set({ logoFile: file }),
  setSelectedTheme: (theme) => set({ selectedTheme: theme }),
  setBackgroundImage: (file) => set({ backgroundImage: file }),
  setCustomColors: (colors) => set({ customColors: colors }),
  setSegmentCount: (count) => set({ segmentCount: count }),
  setCurrentStep: (step) => set({ currentStep: step }),
  reset: () => set({
    selectedGameType: null,
    campaignName: '',
    launchDate: '',
    marketingGoal: '',
    logoFile: null,
    selectedTheme: null,
    backgroundImage: null,
    customColors: {
      primary: '#841b60',
      secondary: '#3b82f6',
      accent: '#10b981'
    },
    segmentCount: 6,
    currentStep: 1,
  }),

  // Nouvelle méthode pour générer les données de campagne
  generatePreviewCampaign: () => {
    const state = get();
    
    // Générer les segments de la roue avec les couleurs personnalisées
    const colors = [state.customColors.primary, state.customColors.secondary, state.customColors.accent || '#10b981'];
    const segments = Array.from({ length: state.segmentCount }).map((_, i) => ({
      label: `Prix ${i + 1}`,
      color: colors[i % colors.length],
      chance: Math.floor(100 / state.segmentCount)
    }));

    return {
      id: 'preview',
      name: state.campaignName || 'Aperçu de la campagne',
      type: 'wheel',
      config: {
        roulette: {
          segments: segments,
          theme: state.selectedTheme || 'default',
          borderColor: state.customColors.primary,
          pointerColor: state.customColors.primary,
          centerLogo: state.logoFile ? URL.createObjectURL(state.logoFile) : undefined
        }
      },
      gameConfig: {
        wheel: {
          template: state.selectedTheme,
          backgroundImage: state.backgroundImage ? URL.createObjectURL(state.backgroundImage) : undefined,
          buttonLabel: 'Lancer la roue',
          buttonColor: state.customColors.primary,
          instantWin: {
            mode: 'instant_winner' as const,
            winProbability: 0.1,
            maxWinners: 10,
            winnersCount: 0
          }
        }
      },
      design: {
        template: state.selectedTheme,
        theme: state.selectedTheme,
        colors: {
          primary: state.customColors.primary,
          secondary: state.customColors.secondary,
          accent: state.customColors.accent
        },
        customColors: state.customColors,
        backgroundImage: state.backgroundImage ? URL.createObjectURL(state.backgroundImage) : undefined,
        centerLogo: state.logoFile ? URL.createObjectURL(state.logoFile) : undefined
      },
      buttonConfig: {
        color: state.customColors.primary,
        borderColor: state.customColors.primary,
        borderWidth: 2,
        borderRadius: 12,
        size: 'medium',
        text: 'Lancer la roue',
        visible: true
      },
      screens: [
        {
          title: 'Tentez votre chance !',
          description: 'Participez pour avoir une chance de gagner !',
          showTitle: true,
          showDescription: true
        },
        {
          title: 'Vos informations',
          buttonText: "C'est parti !"
        },
        {},
        {
          winMessage: 'Félicitations, vous avez gagné !',
          loseMessage: 'Dommage, réessayez !',
          replayButtonText: 'Rejouer'
        }
      ],
      formFields: [
        {
          id: "prenom",
          label: "Prénom",
          required: true
        },
        {
          id: "nom", 
          label: "Nom",
          required: true
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          required: true
        }
      ],
      mobileConfig: {
        backgroundColor: '#ebf4f7',
        gamePosition: 'center',
        textPosition: 'top',
        verticalSpacing: 20,
        horizontalPadding: 16,
        showTitle: true,
        showDescription: true,
        title: 'Tentez votre chance !',
        description: 'Participez pour avoir une chance de gagner !',
        titleColor: '#000000',
        descriptionColor: '#666666',
        titleSize: 'text-2xl',
        descriptionSize: 'text-base',
        titleAlignment: 'text-center',
        descriptionAlignment: 'text-center',
        fontFamily: 'Inter',
        contrastBackground: {
          enabled: false
        }
      }
    };
  }
}));
