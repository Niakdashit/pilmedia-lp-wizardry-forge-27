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

// Analyse la charte graphique depuis l'API et retourne la palette prête pour l'app
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

// Calcul automatique du texte contrasté
export function getAccessibleTextColor(backgroundColor: string): string {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

// ColorThief utilitaires
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

// Extraction ColorThief via <img>
export async function extractColorsFromLogo(logoUrl: string): Promise<string[]> {
  try {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    return new Promise((resolve, reject) => {
      img.onload = () => {
        try {
          const colorThief = new ColorThief();
          const rawColors = colorThief.getPalette(img, 5);
          const colors = rawColors.map(([r, g, b]: number[]) => rgbToHex(r, g, b));
          resolve(colors);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Logo load failed'));
      img.src = logoUrl;
    });
  } catch (error) {
    return [];
  }
}

// Détection palette trop générique (bleu/gris/terne)
function isPaletteNeutral(palette: any): boolean {
  if (!palette?.vibrant?.background && !palette?.darkVibrant?.background) return true;
  const colors = [
    palette?.vibrant?.background,
    palette?.darkVibrant?.background,
    palette?.lightVibrant?.background
  ].filter(Boolean);
  if (colors.length === 0) return true;
  const genericColors = colors.filter(color => {
    const hex = color.toLowerCase();
    if (hex.includes('3b82') || hex.includes('2563') || hex.includes('1d4ed8')) return true;
    if (hex.includes('6b7280') || hex.includes('374151') || hex.includes('9ca3af')) return true;
    return false;
  });
  return genericColors.length >= colors.length * 0.7;
}

// Palette complète à partir de Microlink, ou fallback logo
export async function extractBrandPaletteFromMicrolink(data: any): Promise<BrandPalette> {
  const palette = data?.palette;
  const logoUrl = data?.logo?.url;

  // Palette Microlink prioritaire si elle est riche
  if (palette && !isPaletteNeutral(palette)) {
    return extractCompletePaletteFromMicrolink(palette);
  }

  // Sinon : fallback analyse du logo si possible (navigateur uniquement)
  if (logoUrl && typeof window !== 'undefined') {
    try {
      const logoColors = await extractColorsFromLogo(logoUrl);
      if (logoColors.length >= 2) {
        return generateBrandThemeFromColors(logoColors);
      }
    } catch { }
  }

  // Sinon : fallback palette même si "neutre"
  if (palette && palette?.vibrant?.background) {
    return extractCompletePaletteFromMicrolink(palette);
  }

  // Sinon : fallback screenshot
  const screenshotUrl = data?.screenshot?.url;
  if (screenshotUrl && typeof window !== 'undefined') {
    try {
      const screenshotColors = await extractColorsFromLogo(screenshotUrl);
      if (screenshotColors.length >= 2) {
        return generateBrandThemeFromColors(screenshotColors);
      }
    } catch { }
  }

  // Sinon : couleur défaut
  return generateBrandThemeFromColors(['#841b60', '#dc2626', '#ffffff', '#f8fafc']);
}

// Génération palette intelligente depuis couleurs (logo, screenshot, etc)
export function generateBrandThemeFromColors(colors: string[]): BrandPalette {
  const sortedColors = colors.sort((a, b) => getLuminance(b) - getLuminance(a));
  const primaryColor = sortedColors[0] || '#841b60';
  const secondaryColor = sortedColors[1] || primaryColor;
  const accentColor = sortedColors[2] || primaryColor;
  const backgroundColor = sortedColors.find(c => getLuminance(c) > 0.8) || '#ffffff';
  const textColor = getAccessibleTextColor(accentColor);
  return { primaryColor, secondaryColor, accentColor, backgroundColor, textColor };
}

// Génération palette complète cohérente depuis Microlink
export function extractCompletePaletteFromMicrolink(palette: any): BrandPalette {
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

// Pour compatibilité avec l'ancien nom
export function generateBrandThemeFromMicrolinkPalette(palette: any): BrandPalette {
  return extractCompletePaletteFromMicrolink(palette);
}

function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
}

// Application de la charte sur la roue
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
