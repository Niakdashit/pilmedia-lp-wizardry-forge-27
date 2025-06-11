export type PreviewDevice = 'desktop' | 'tablet' | 'mobile';

export const getCampaignBackgroundImage = (
  campaign: any,
  device: PreviewDevice = 'desktop'
): string | undefined => {
  if (!campaign) return undefined;
  const design = campaign.design || {};

  if (device === 'mobile') {
    return design.mobileBackgroundImage || design.backgroundImage;
  }

  return design.backgroundImage;
};
