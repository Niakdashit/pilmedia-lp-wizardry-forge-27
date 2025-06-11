
export interface BrandStyle {
  primaryColor: string;
  logoUrl?: string;
  fontUrl?: string;
  faviconUrl?: string;
  secondaryColor?: string;
  lightColor?: string;
  darkColor?: string;
}

export interface BrandPalette {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

export async function analyzeBrandStyle(siteUrl: string): Promise<BrandStyle> {
  // On prend screenshot=false pour éviter de surcharger, palette et meta suffisent
  const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(siteUrl)}&palette=true&meta=true&screenshot=false`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error('Microlink request failed');
  }
  const json = await res.json();
  const data = json.data || {};
  const palette = data.palette || {};

  // Extraction logique de la palette (ordre de priorité optimisé)
  const primaryColor =
    palette?.vibrant?.background ||
    palette?.lightVibrant?.background ||
    palette?.darkVibrant?.background ||
    '#841b60';

  const secondaryColor =
    palette?.lightMuted?.background ||
    palette?.muted?.background ||
    palette?.darkMuted?.background ||
    palette?.darkVibrant?.background ||
    palette?.lightVibrant?.background ||
    '#E3F2FD';

  const lightColor =
    palette?.lightVibrant?.background ||
    palette?.vibrant?.background ||
    '#ffffff';

  const darkColor =
    palette?.darkVibrant?.background ||
    palette?.darkMuted?.background ||
    palette?.muted?.background ||
    primaryColor;

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

// Nouvelle fonction pour calculer le contraste et retourner la couleur de texte accessible
export function getAccessibleTextColor(backgroundColor: string): string {
  // Convertir la couleur hex en RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculer la luminance relative (WCAG)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Retourner blanc ou noir selon le meilleur contraste
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Helper pour générer une palette de marque cohérente à partir de la palette Microlink
export function generateBrandThemeFromMicrolinkPalette(palette: any): BrandPalette {
  console.log('🎨 Palette Microlink reçue:', palette);

  const primaryColor =
    palette?.vibrant?.background ||
    palette?.lightVibrant?.background ||
    palette?.darkVibrant?.background ||
    '#841b60';

  const secondaryColor =
    palette?.darkVibrant?.background ||
    palette?.muted?.background ||
    primaryColor;

  const accentColor =
    palette?.lightVibrant?.background ||
    palette?.lightMuted?.background ||
    primaryColor;

  const backgroundColor =
    palette?.lightMuted?.background ||
    palette?.muted?.background ||
    '#ffffff';

  const textColor = getAccessibleTextColor(accentColor);

  const brandPalette: BrandPalette = {
    primaryColor,
    secondaryColor,
    accentColor,
    backgroundColor,
    textColor
  };

  console.log('🎯 Palette de marque générée:', brandPalette);
  return brandPalette;
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
      borderColor: colors.primary,
      textColor: getAccessibleTextColor(colors.accent || colors.primary)
    }
  };
}
