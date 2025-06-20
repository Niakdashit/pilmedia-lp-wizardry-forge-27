
import { QuickCampaignState } from './types';
import { initialState } from './initialState';

export const createActions = (set: any, get: any) => ({
  setCurrentStep: (step: number) => set({ currentStep: step }),
  setCampaignName: (name: string) => set({ campaignName: name }),
  setSelectedGameType: (type: string) => set({ selectedGameType: type }),
  setLaunchDate: (date: string) => set({ launchDate: date }),
  setMarketingGoal: (goal: string) => set({ marketingGoal: goal }),
  setLogoFile: (file: File | null) => set({ logoFile: file }),
  setBrandSiteUrl: (url: string) => set({ brandSiteUrl: url }),
  setLogoUrl: (url: string | null) => set({ logoUrl: url }),
  setFontUrl: (url: string | null) => set({ fontUrl: url }),
  setSelectedTheme: (theme: string) => set({ selectedTheme: theme }),
  setBackgroundImage: (file: File | null) => set({ backgroundImage: file }),
  setBackgroundImageUrl: (url: string | null) => set({ backgroundImageUrl: url }),
  setSegmentCount: (count: number) =>
    set((state: QuickCampaignState) => ({
      segmentCount: count,
      segmentPrizes: Array.from({ length: count }).map((_, i) =>
        state.segmentPrizes[i] || { label: '', image: null }
      )
    })),
  setGamePosition: (position: 'top' | 'center' | 'bottom' | 'left' | 'right') => set({ gamePosition: position }),
  setCustomColors: (colors: { primary: string; secondary: string; accent: string; textColor?: string; buttonStyle?: string }) => set({ customColors: colors }),
  setJackpotColors: (colors: any) => set({ jackpotColors: colors }),
  setAdvancedMode: (mode: boolean) => set({ advancedMode: mode }),
  setPointerImage: (file: File | null) => set({ pointerImage: file }),
  setPointerImageUrl: (url: string | null) => set({ pointerImageUrl: url }),
  setBorderRadius: (radius: number) => set({ borderRadius: radius }),
  setPrize: (index: number, prize: { label: string; image: string | null }) =>
    set((state: QuickCampaignState) => {
      const segmentPrizes = [...state.segmentPrizes];
      segmentPrizes[index] = prize;
      return { segmentPrizes };
    }),
  addSkin: (skin: any) =>
    set((state: QuickCampaignState) => ({ skins: [...state.skins, skin] })),
  setActiveSkinIndex: (index: number) => set({ activeSkinIndex: index }),
  recordClick: () =>
    set((state: QuickCampaignState) => ({
      stats: { ...state.stats, clicks: state.stats.clicks + 1 }
    })),
  recordSpin: () =>
    set((state: QuickCampaignState) => ({
      stats: { ...state.stats, spins: state.stats.spins + 1 }
    })),
  recordWin: () =>
    set((state: QuickCampaignState) => ({
      stats: { ...state.stats, wins: state.stats.wins + 1 }
    })),
  simulateWins: (trials: number, winProbability: number) => {
    let wins = 0;
    for (let i = 0; i < trials; i++) {
      if (Math.random() < winProbability) wins++;
    }
    return { wins, losses: trials - wins };
  },
  setQuizQuestions: (questions: any[]) => set({ quizQuestions: questions }),

  reset: () => {
    const state = get() as QuickCampaignState;
    const bgUrl = state.backgroundImageUrl;
    if (bgUrl) {
      URL.revokeObjectURL(bgUrl);
    }
    const pointerUrl = state.pointerImageUrl;
    if (pointerUrl) {
      URL.revokeObjectURL(pointerUrl);
    }
    set(initialState);
  }
});
