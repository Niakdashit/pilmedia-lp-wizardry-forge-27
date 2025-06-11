export interface BrandStyle {
  primaryColor: string;
  logoUrl?: string;
  fontUrl?: string;
  faviconUrl?: string;
  secondaryColor?: string;
  lightColor?: string;
  darkColor?: string;
}

export async function analyzeBrandStyle(siteUrl: string): Promise<BrandStyle> {
  const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(siteUrl)}&palette=true&meta=true&screenshot=true`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error('Microlink request failed');
  }
  const json = await res.json();
  const data = json.data || {};
  const screenshot = data.screenshot || {};
  const palette = screenshot.palette || [];
  const primaryColor =
    data?.palette?.vibrant?.background ||
    data?.palette?.lightVibrant?.background ||
    data?.palette?.darkVibrant?.background ||
    screenshot.background_color ||
    palette[0] ||
    '#841b60';

  const secondaryColor =
    data?.palette?.darkVibrant?.background ||
    palette[1] ||
    screenshot.color;
  const lightColor =
    data?.palette?.lightVibrant?.background ||
    palette[3] ||
    screenshot.alternative_color;
  const darkColor =
    data?.palette?.darkVibrant?.background ||
    palette[0] ||
    screenshot.background_color;

  return {
    primaryColor,
    logoUrl: data.logo?.url,
    fontUrl: data.font?.url,
    faviconUrl: data.favicon?.url,
    secondaryColor,
    lightColor,
    darkColor,
  };
}

export interface BrandColors {
  primary: string;
  secondary: string;
  accent?: string;
}

// Central helper to apply a brand color scheme to a wheel configuration
export function applyBrandStyleToWheel(campaign: any, colors: BrandColors) {
  const updatedSegments = (campaign?.config?.roulette?.segments || []).map(
    (segment: any, index: number) => ({
      ...segment,
      color: segment.color || (index % 2 === 0 ? colors.primary : colors.secondary)
    })
  );

  return {
    ...campaign,
    config: {
      ...campaign.config,
      roulette: {
        ...(campaign.config?.roulette || {}),
        borderColor: colors.primary,
        borderOutlineColor: colors.accent || colors.secondary || colors.primary,
        segmentColor1: colors.primary,
        segmentColor2: colors.secondary,
        segments: updatedSegments
      }
    },
    design: {
      ...(campaign.design || {}),
      customColors: colors
    },
    buttonConfig: {
      ...(campaign.buttonConfig || {}),
      color: colors.accent || colors.primary,
      borderColor: colors.primary
    }
  };
}
