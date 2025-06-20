
import { create } from 'zustand';
import { QuickCampaignStore } from './quickCampaign/types';
import { initialState } from './quickCampaign/initialState';
import { createActions } from './quickCampaign/actions';
import { generatePreviewCampaign } from './quickCampaign/campaignGenerator';

export const useQuickCampaignStore = create<QuickCampaignStore>((set, get) => ({
  ...initialState,
  ...createActions(set, get),
  generatePreviewCampaign: () => generatePreviewCampaign(get())
}));

// Re-export types for backward compatibility
export type { QuickCampaignState } from './quickCampaign/types';
