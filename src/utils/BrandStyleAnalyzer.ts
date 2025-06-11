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

// --- MAIN: Analyse la charte à partir de l’API et retourne la structure pour l’app ---
export async function analyzeBrandStyle(siteUrl: string): Promise<BrandStyle> {
  const apiUrl =
    `https://api.microlink.io/?url=${encodeURIComponent(siteUrl)}` +
    `&palette=true&screenshot=true&meta=true&color=true`;
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error('Microlink request failed');
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

// -- Génère une couleur de texte accessible sur le fond donné (contraste auto) --
export function getAccessibleTextColor(backgroundColor: string): string {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

// ---- EXTRACTION DE LA PALETTE COHÉRENTE, PRIORITÉ MARQUE, ACCENT ET BG ----
export function extractCompletePaletteFromMicrolink(palette: any): BrandPalette {
  // Sélectionne des candidats selon le type, évite les doublons
  const primaryCandidates = [
    palette?.vibrant?.background,
    palette?.darkVibrant?.background,
    palette?.muted?.background
  ].filter(Boolean);

  const secondaryCandidates = [
    palette?.darkVibrant?.background,
    palette?.darkMuted?.background,
    palette?.vibrant?.background
  ].filter(Boolean);

  const accentCandidates = [
    palette?.lightVibrant?.background,
    palette?.lightMuted?.background,
    palette?.vibrant?.background
  ].filter(Boolean);

  const backgroundCandidates = [
    palette?.lightMuted?.background,
    palette?.muted?.background,
    '#ffffff'
  ].filter(Boolean);

  const primaryColor = primaryCandidates[0] || '#841b60';
  const secondaryColor = secondaryCandidates.find(c => c !== primaryColor) || secondaryCandidates[0] || '#666666';
  const accentColor = accentCandidates.find(c => c !== primaryColor && c !== secondaryColor) || accentCandidates[0] || primaryColor;
  const backgroundColor = backgroundCandidates.find(c => c !== primaryColor && c !== secondaryColor) || '#ffffff';
  const textColor = getAccessibleTextColor(accentColor);

  return { primaryColor, secondaryColor, accentColor, backgroundColor, textColor };
}

// -- Ancienne signature compatible, mais appelle la nouvelle logique --
export function generateBrandThemeFromMicrolinkPalette(palette: any): BrandPalette {
  return extractCompletePaletteFromMicrolink(palette);
}

// -- Si la palette Microlink est trop neutre, on tente ColorThief sur le logo/screenshot (fallback) --
export async function extractBrandPaletteFromMicrolink(data: any): Promise<BrandPalette> {
  const palette = data?.palette;
  if (palette && palette?.vibrant?.background) {
    return extractCompletePaletteFromMicrolink(palette);
  }
  const imageUrl = data?.logo?.url || data?.screenshot?.url;
  if (imageUrl && typeof window !== 'undefined') {
    try {
      const rawColors = await ColorThief.getPalette(imageUrl, 4);
      const colors = rawColors.map(([r, g, b]: number[]) => rgbToHex(r, g, b));
      return generateBrandThemeFromColors(colors);
    } catch (e) {
      console.error('ColorThief error', e);
    }
  }
  // Fallback final
  return generateBrandThemeFromColors(['#841b60', '#1e3a8a', '#dc2626', '#ffffff']);
}

// Utilitaires pour le fallback ColorThief
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

// Fallback : génère une palette simple à partir d’un tableau de couleurs extraites
export function generateBrandThemeFromColors(colors: string[]): BrandPalette {
  const [primary = '#841b60', secondary, accent, background] = colors;
  return {
    primaryColor: primary,
    secondaryColor: secondary || primary,
    accentColor: accent || primary,
    backgroundColor: background || '#ffffff',
    textColor: getAccessibleTextColor(accent || primary)
  };
}

// --- Utilisé dans l’application pour mapper la palette sur la roue / bouton etc ---
export interface BrandColors {
  primary: string;
  secondary: string;
  accent?: string;
}

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
