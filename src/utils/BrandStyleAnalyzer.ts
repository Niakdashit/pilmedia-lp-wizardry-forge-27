export interface BrandStyle {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  logoUrl?: string;
  fontUrl?: string;
  faviconUrl?: string;
}

export interface MicrolinkPalette {
  vibrant?: { background: string };
  darkVibrant?: { background: string };
  lightVibrant?: { background: string };
  muted?: { background: string };
}

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  textColor: string;
}

export function getAccessibleTextColor(backgroundColor: string): string {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

export function generateBrandThemeFromMicrolinkPalette(palette: MicrolinkPalette): BrandStyle {
  const vibrant = palette?.vibrant?.background;
  const darkVibrant = palette?.darkVibrant?.background;
  const lightVibrant = palette?.lightVibrant?.background;
  const muted = palette?.muted?.background;

  const primaryColor = vibrant || darkVibrant || lightVibrant || muted || '#841b60';
  const secondaryColor = darkVibrant || vibrant || muted || '#0056a1';
  const accentColor = lightVibrant || vibrant || muted || '#fdb913';
  const textColor = getAccessibleTextColor(accentColor);

  return {
    primaryColor,
    secondaryColor,
    accentColor,
    textColor,
  };
}

export async function analyzeBrandStyle(siteUrl: string): Promise<BrandStyle> {
  const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(siteUrl)}&palette=true&meta=true&screenshot=false`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error('Microlink request failed');
  }
  const json = await res.json();
  const data = json.data || {};
  const palette: MicrolinkPalette = data.palette || {};
  const theme = generateBrandThemeFromMicrolinkPalette(palette);

  return {
    ...theme,
    logoUrl: data.logo?.url,
    fontUrl: data.font?.url,
    faviconUrl: data.favicon?.url,
  };
}

// Central helper to apply a brand color scheme to a wheel configuration
export function applyBrandColorsToVisualStyle(campaign: any, colors: BrandColors) {
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
        borderColor: colors.secondary,
        borderOutlineColor: colors.accent,
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
      color: colors.accent,
      textColor: colors.textColor,
      borderColor: colors.secondary
    }
  };
}

