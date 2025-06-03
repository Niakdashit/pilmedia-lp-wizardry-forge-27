
import { create } from 'zustand';

export interface QuickCampaignState {
  currentStep: number;
  campaignName: string;
  selectedGameType: string | null;
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
  setCurrentStep: (step: number) => void;
  setCampaignName: (name: string) => void;
  setSelectedGameType: (type: string) => void;
  setCustomColors: (colors: { primary: string; secondary: string; accent?: string }) => void;
  setJackpotColors: (colors: any) => void;
  generatePreviewCampaign: () => any;
  reset: () => void;
}

export const useQuickCampaignStore = create<QuickCampaignState>((set, get) => ({
  currentStep: 1,
  campaignName: 'Ma Nouvelle Campagne',
  selectedGameType: null,
  // Couleurs harmonieuses par défaut
  customColors: {
    primary: '#3B82F6', // Bleu corporate moderne
    secondary: '#E3F2FD', // Bleu très clair
    accent: '#1E40AF' // Bleu foncé
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

  setCurrentStep: (step) => set({ currentStep: step }),
  setCampaignName: (name) => set({ campaignName: name }),
  setSelectedGameType: (type) => set({ selectedGameType: type }),
  setCustomColors: (colors) => set({ customColors: colors }),
  setJackpotColors: (colors) => set({ jackpotColors: colors }),

  generatePreviewCampaign: () => {
    const state = get();
    
    const baseConfig = {
      id: 'quick-preview',
      name: state.campaignName,
      type: state.selectedGameType || 'wheel',
      design: {
        customColors: state.customColors,
        centerLogo: null
      },
      buttonConfig: {
        color: state.customColors.primary,
        borderColor: state.customColors.primary,
        borderWidth: 2,
        borderRadius: 8,
        size: 'medium',
        text: 'Jouer maintenant !',
        visible: true
      },
      config: {},
      gameConfig: {}
    };

    // Configuration spécifique pour la roue
    if (state.selectedGameType === 'wheel') {
      baseConfig.config = {
        roulette: {
          segments: [
            { label: 'Prix 1', color: state.customColors.primary, image: null },
            { label: 'Prix 2', color: state.customColors.secondary, image: null },
            { label: 'Prix 3', color: state.customColors.primary, image: null },
            { label: 'Dommage', color: state.customColors.secondary, image: null }
          ],
          borderColor: state.customColors.primary,
          borderOutlineColor: state.customColors.accent || state.customColors.primary,
          segmentColor1: state.customColors.primary,
          segmentColor2: state.customColors.secondary,
          theme: 'default'
        }
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

    // Configuration spécifique pour le jackpot
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

    return baseConfig;
  },

  reset: () => set({
    currentStep: 1,
    campaignName: 'Ma Nouvelle Campagne',
    selectedGameType: null,
    customColors: {
      primary: '#3B82F6',
      secondary: '#E3F2FD',
      accent: '#1E40AF'
    },
    jackpotColors: {
      containerBackgroundColor: '#1f2937',
      backgroundColor: '#3B82F6',
      borderColor: '#1E40AF',
      borderWidth: 3,
      slotBorderColor: '#60A5FA',
      slotBorderWidth: 2,
      slotBackgroundColor: '#ffffff'
    }
  })
}));
