
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

import ColorThief from 'colorthief';

export async function analyzeBrandStyle(siteUrl: string): Promise<BrandStyle> {
  // Inclure screenshot et color pour une extraction plus fiable
  const apiUrl =
    `https://api.microlink.io/?url=${encodeURIComponent(siteUrl)}` +
    `&palette=true&screenshot=true&meta=true&color=true`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error('Microlink request failed');
  }
  const json = await res.json();
  const data = json.data || {};
  const brandPalette = await extractBrandPaletteFromMicrolink(data);

  return {
    primaryColor: brandPalette.primaryColor,
    logoUrl: data.logo?.url,
    fontUrl: data.font?.url,
    faviconUrl: data.favicon?.url,
    secondaryColor: brandPalette.secondaryColor,
    lightColor: brandPalette.accentColor,
    darkColor: brandPalette.backgroundColor,
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

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map(x => {
        const h = x.toString(16);
        return h.length === 1 ? '0' + h : h;
      })
      .join('')
  );
}

function isNeutralColor(hex: string | undefined): boolean {
  if (!hex) return true;
  const [r, g, b] = hexToRgb(hex.toLowerCase());
  // Couleurs très proches de gris ou bleu générique
  const close = Math.abs(r - g) < 10 && Math.abs(g - b) < 10;
  const genericBlues = ['#007bff'];
  return close || genericBlues.includes(hex.toLowerCase());
}

function paletteHasMeaningfulColors(palette: any): boolean {
  const vib = palette?.vibrant?.background as string | undefined;
  if (!vib) return false;
  return !isNeutralColor(vib);
}

export function generateBrandThemeFromColors(colors: string[]): BrandPalette {
  const [primary = '#841b60', secondary, accent, background] = colors;
  const palette: BrandPalette = {
    primaryColor: primary,
    secondaryColor: secondary || primary,
    accentColor: accent || primary,
    backgroundColor: background || '#ffffff',
    textColor: getAccessibleTextColor(accent || primary)
  };
  return palette;
}

export async function extractBrandPaletteFromMicrolink(data: any): Promise<BrandPalette> {
  const palette = data?.palette;
  if (palette && paletteHasMeaningfulColors(palette)) {
    return generateBrandThemeFromMicrolinkPalette(palette);
  }

  const imageUrl = data?.logo?.url || data?.screenshot?.url;
  if (imageUrl) {
    try {
      const rawColors = await ColorThief.getPalette(imageUrl, 4);
      const colors = rawColors.map(([r, g, b]) => rgbToHex(r, g, b));
      return generateBrandThemeFromColors(colors);
    } catch (e) {
      console.error('ColorThief error', e);
    }
  }

  return generateBrandThemeFromColors(['#841b60', '#1e3a8a', '#dc2626', '#ffffff']);
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
