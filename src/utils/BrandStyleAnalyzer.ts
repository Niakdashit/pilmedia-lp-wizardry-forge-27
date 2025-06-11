
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

export interface BrandTheme {
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  logoUrl?: string;
}

import ColorThief from 'colorthief';

// Fetch brand info from Brandfetch API
async function fetchBrandfetchData(domain: string): Promise<any> {
  const res = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_BRANDFETCH_KEY}` }
  });
  if (!res.ok) throw new Error('Brandfetch request failed');
  return res.json();
}

// Helper principal : Génération d'un thème complet à partir d'une URL
export async function generateBrandThemeFromUrl(url: string): Promise<BrandTheme> {
  try {
    console.log('🎯 Génération du thème de marque pour:', url);

    const domain = new URL(url).hostname;
    let brandData: any = null;
    let logoUrl: string | undefined;

    try {
      brandData = await fetchBrandfetchData(domain);
      logoUrl = brandData?.logos?.[0]?.formats?.[0]?.src;
    } catch (err) {
      console.warn('⚠️ Brandfetch error:', err);
    }

    console.log('📷 Logo trouvé:', logoUrl);

    // 1. Couleurs directes Brandfetch
    if (brandData?.colors?.length) {
      const colors = brandData.colors.map((c: any) => c.hex || c);
      const primary = colors[0];
      const secondary = colors[1] || primary;
      const accent = colors[2] || '#ffffff';

      return {
        customColors: {
          primary,
          secondary,
          accent,
          text: getAccessibleTextColor(accent)
        },
        logoUrl
      };
    }

    // 2. Extraction des couleurs du logo avec ColorThief (priorité absolue)
    if (logoUrl && typeof window !== 'undefined') {
      try {
        const logoColors = await extractColorsFromLogo(logoUrl);
        if (logoColors.length >= 2) {
          console.log('🎨 Couleurs extraites du logo:', logoColors);
          const palette = generateAdvancedPaletteFromColors(logoColors);
          
          return {
            customColors: {
              primary: palette.primaryColor,
              secondary: palette.secondaryColor,
              accent: palette.accentColor,
              text: palette.textColor
            },
            logoUrl
          };
        }
      } catch (error) {
        console.warn('⚠️ Échec extraction logo ColorThief:', error);
      }
    }
    
    // 3. Fallback final : Palette par défaut
    console.log('🔄 Fallback vers palette par défaut');
    return {
      customColors: {
        primary: '#841b60',
        secondary: '#dc2626',
        accent: '#10b981',
        text: '#ffffff'
      },
      logoUrl
    };
    
  } catch (error) {
    console.error('❌ Erreur génération thème:', error);
    
    // Palette d'urgence
    return {
      customColors: {
        primary: '#841b60',
        secondary: '#dc2626',
        accent: '#10b981',
        text: '#ffffff'
      }
    };
  }
}

// Récupération des données Brandfetch
async function fetchBrandData(siteUrl: string): Promise<any> {
  const domain = new URL(siteUrl).hostname;
  return fetchBrandfetchData(domain);
}

// Analyse la charte graphique depuis l'API et retourne la palette prête pour l'app
export async function analyzeBrandStyle(siteUrl: string): Promise<BrandStyle> {
  const data = await fetchBrandData(siteUrl);
  const brandPalette = await extractBrandPaletteFromBrandfetch(data);

  return {
    primaryColor: brandPalette.primaryColor,
    logoUrl: data.logos?.[0]?.formats?.[0]?.src,
    fontUrl: data.fonts?.[0]?.files?.regular,
    faviconUrl: data.icon,
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

// Alias plus explicite
export const getReadableTextColor = getAccessibleTextColor;

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

// Extraction ColorThief via <img> - VERSION AMÉLIORÉE
export async function extractColorsFromLogo(logoUrl: string): Promise<string[]> {
  try {
    console.log('🔍 Extraction ColorThief du logo:', logoUrl);
    
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    return new Promise((resolve, reject) => {
      img.onload = () => {
        try {
          const colorThief = new ColorThief();
          
          // Extraction de la couleur dominante + palette
          const dominantColor = colorThief.getColor(img, 10);
          const palette = colorThief.getPalette(img, 6, 10);
          
          // Conversion en hex
          const dominantHex = rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);
          const paletteHex = palette.map(([r, g, b]: number[]) => rgbToHex(r, g, b));
          
          // Fusion intelligente : dominante + palette
          const allColors = [dominantHex, ...paletteHex.filter(c => c !== dominantHex)];
          
          console.log('✅ Couleurs extraites:', allColors);
          resolve(allColors.slice(0, 5)); // Limiter à 5 couleurs max
          
        } catch (error) {
          console.error('❌ Erreur ColorThief:', error);
          reject(error);
        }
      };
      
      img.onerror = () => {
        console.error('❌ Impossible de charger le logo:', logoUrl);
        reject(new Error('Logo load failed'));
      };
      
      img.src = logoUrl;
    });
    
  } catch (error) {
    console.error('❌ Erreur générale extraction logo:', error);
    return [];
  }
}

// Génération palette avancée depuis couleurs ColorThief
export function generateAdvancedPaletteFromColors(colors: string[]): BrandPalette {
  console.log('🎨 Génération palette avancée depuis:', colors);
  
  // Tri par luminance pour organiser les couleurs
  const sortedColors = colors.sort((a, b) => getLuminance(b) - getLuminance(a));
  
  // Sélection intelligente des couleurs
  const primaryColor = sortedColors[0] || '#841b60'; // Plus saturée
  
  // Recherche d'une couleur contrastée pour le secondaire
  const secondaryColor = findContrastingColor(sortedColors, primaryColor) || sortedColors[1] || '#dc2626';
  
  // Couleur d'accent (plus claire ou différente)
  const accentColor = findAccentColor(sortedColors, primaryColor, secondaryColor) || '#10b981';
  
  // Couleur de texte optimale
  const textColor = getAccessibleTextColor(accentColor);
  
  const result = {
    primaryColor,
    secondaryColor,
    accentColor,
    backgroundColor: '#ffffff',
    textColor
  };
  
  console.log('✅ Palette générée:', result);
  return result;
}

// Recherche d'une couleur contrastée
function findContrastingColor(colors: string[], excludeColor: string): string | null {
  const excludeLuminance = getLuminance(excludeColor);
  
  for (const color of colors) {
    if (color === excludeColor) continue;
    
    const luminance = getLuminance(color);
    const contrast = Math.abs(luminance - excludeLuminance);
    
    // Contraste minimum requis
    if (contrast > 0.3) {
      return color;
    }
  }
  
  return null;
}

// Recherche d'une couleur d'accent
function findAccentColor(colors: string[], primaryColor: string, secondaryColor: string): string | null {
  for (const color of colors) {
    if (color === primaryColor || color === secondaryColor) continue;
    
    // Préférer les couleurs avec une bonne saturation
    const luminance = getLuminance(color);
    if (luminance > 0.2 && luminance < 0.8) {
      return color;
    }
  }
  
  return null;
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

// Palette complète à partir de Brandfetch, ou fallback logo
export async function extractBrandPaletteFromBrandfetch(data: any): Promise<BrandPalette> {
  const palette = data?.colors;
  const logoUrl = data?.logos?.[0]?.formats?.[0]?.src;

  // Palette Brandfetch prioritaire si elle est riche
  if (palette && palette.length >= 2) {
    return extractCompletePaletteFromBrandfetch(palette);
  }

  // Sinon : fallback analyse du logo si possible (navigateur uniquement)
  if (logoUrl && typeof window !== 'undefined') {
    try {
      const logoColors = await extractColorsFromLogo(logoUrl);
      if (logoColors.length >= 2) {
        return generateAdvancedPaletteFromColors(logoColors);
      }
    } catch { }
  }

  // Sinon : fallback palette même si "neutre"
  if (palette && palette.length >= 2) {
    return extractCompletePaletteFromBrandfetch(palette);
  }

  // Sinon : fallback screenshot
  const screenshotUrl = undefined;
  if (screenshotUrl && typeof window !== 'undefined') {
    try {
      const screenshotColors = await extractColorsFromLogo(screenshotUrl);
      if (screenshotColors.length >= 2) {
        return generateAdvancedPaletteFromColors(screenshotColors);
      }
    } catch { }
  }

  // Sinon : couleur défaut
  return generateAdvancedPaletteFromColors(['#841b60', '#dc2626', '#ffffff', '#f8fafc']);
}

// Génération palette intelligente depuis couleurs (logo, screenshot, etc)
export function generateBrandThemeFromColors(colors: string[]): BrandPalette {
  return generateAdvancedPaletteFromColors(colors);
}

// Génération palette complète cohérente depuis Brandfetch
export function extractCompletePaletteFromBrandfetch(palette: any[]): BrandPalette {
  const colors = palette.map(c => c.hex || c).filter(Boolean);
  const primaryColor = colors[0] || '#841b60';
  const secondaryColor = colors[1] || primaryColor;
  const accentColor = colors[2] || '#10b981';
  const backgroundColor = '#ffffff';
  const textColor = getAccessibleTextColor(accentColor);

  return { primaryColor, secondaryColor, accentColor, backgroundColor, textColor };
}

// Pour compatibilité avec l'ancien nom
export function generateBrandThemeFromMicrolinkPalette(palette: any): BrandPalette {
  return extractCompletePaletteFromBrandfetch(palette);
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
