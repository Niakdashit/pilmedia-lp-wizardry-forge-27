
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
}

export const useQuickCampaignStore = create<QuickCampaignState>((set) => ({
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
}));
