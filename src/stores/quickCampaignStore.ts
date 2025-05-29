
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
  selectedTemplate: string | null;
  backgroundImage: File | null;
  
  // État général
  currentStep: number;
  
  // Actions
  setGameType: (type: string) => void;
  setCampaignName: (name: string) => void;
  setLaunchDate: (date: string) => void;
  setMarketingGoal: (goal: string) => void;
  setLogoFile: (file: File | null) => void;
  setSelectedTheme: (theme: string) => void;
  setSelectedTemplate: (template: string) => void;
  setBackgroundImage: (file: File | null) => void;
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
  selectedTemplate: null,
  backgroundImage: null,
  currentStep: 1,
  
  // Actions
  setGameType: (type) => set({ selectedGameType: type }),
  setCampaignName: (name) => set({ campaignName: name }),
  setLaunchDate: (date) => set({ launchDate: date }),
  setMarketingGoal: (goal) => set({ marketingGoal: goal }),
  setLogoFile: (file) => set({ logoFile: file }),
  setSelectedTheme: (theme) => set({ selectedTheme: theme }),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  setBackgroundImage: (file) => set({ backgroundImage: file }),
  setCurrentStep: (step) => set({ currentStep: step }),
  reset: () => set({
    selectedGameType: null,
    campaignName: '',
    launchDate: '',
    marketingGoal: '',
    logoFile: null,
    selectedTheme: null,
    selectedTemplate: null,
    backgroundImage: null,
    currentStep: 1,
  }),
}));
