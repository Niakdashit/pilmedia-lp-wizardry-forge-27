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

// --- MAIN: Analyse la charte à partir de l'API et retourne la structure pour l'app ---
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

// ---- NOUVELLE LOGIQUE : Extraire les couleurs du logo avec ColorThief ----
export async function extractColorsFromLogo(logoUrl: string): Promise<string[]> {
  try {
    // Créer une image temporaire pour ColorThief
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    return new Promise((resolve, reject) => {
      img.onload = () => {
        try {
          const colorThief = new ColorThief();
          // Extraire les 5 couleurs dominantes
          const rawColors = colorThief.getPalette(img, 5);
          const colors = rawColors.map(([r, g, b]: number[]) => rgbToHex(r, g, b));
          resolve(colors);
        } catch (error) {
          console.error('Erreur ColorThief:', error);
          reject(error);
        }
      };
      
      img.onerror = () => {
        console.error('Erreur chargement image:', logoUrl);
        reject(new Error('Impossible de charger le logo'));
      };
      
      img.src = logoUrl;
    });
  } catch (error) {
    console.error('Erreur extraction couleurs logo:', error);
    return [];
  }
}

// ---- LOGIQUE INTELLIGENTE : Évaluer si la palette Microlink est "neutre" ----
function isPaletteNeutral(palette: any): boolean {
  if (!palette?.vibrant?.background && !palette?.darkVibrant?.background) {
    return true; // Pas de couleurs vibrantes = neutre
  }
  
  // Vérifier si toutes les couleurs sont dans les tons gris/bleus génériques
  const colors = [
    palette?.vibrant?.background,
    palette?.darkVibrant?.background,
    palette?.lightVibrant?.background
  ].filter(Boolean);
  
  if (colors.length === 0) return true;
  
  // Détection de palettes trop génériques (bleus, gris)
  const genericColors = colors.filter(color => {
    const hex = color.toLowerCase();
    // Vérifier si c'est du bleu générique (#3b82f6, #2563eb, etc.)
    if (hex.includes('3b82') || hex.includes('2563') || hex.includes('1d4ed8')) return true;
    // Vérifier si c'est du gris
    if (hex.includes('6b7280') || hex.includes('374151') || hex.includes('9ca3af')) return true;
    return false;
  });
  
  return genericColors.length >= colors.length * 0.7; // 70% de couleurs génériques = neutre
}

// ---- EXTRACTION INTELLIGENTE AVEC FALLBACK SUR LE LOGO ----
export async function extractBrandPaletteFromMicrolink(data: any): Promise<BrandPalette> {
  const palette = data?.palette;
  const logoUrl = data?.logo?.url;
  
  // 1. Essayer d'abord la palette Microlink si elle semble bonne
  if (palette && !isPaletteNeutral(palette)) {
    console.log('✅ Utilisation palette Microlink (couleurs vibrantes détectées)');
    return extractCompletePaletteFromMicrolink(palette);
  }
  
  // 2. Si la palette est neutre/générique ET qu'on a un logo, analyser le logo
  if (logoUrl && typeof window !== 'undefined') {
    try {
      console.log('🎨 Palette Microlink neutre, analyse du logo...', logoUrl);
      const logoColors = await extractColorsFromLogo(logoUrl);
      
      if (logoColors.length >= 2) {
        console.log('✅ Couleurs extraites du logo:', logoColors);
        return generateBrandThemeFromColors(logoColors);
      }
    } catch (error) {
      console.error('❌ Erreur analyse logo:', error);
    }
  }
  
  // 3. Si la palette Microlink existe quand même (même neutre), l'utiliser
  if (palette && palette?.vibrant?.background) {
    console.log('⚠️ Utilisation palette Microlink par défaut');
    return extractCompletePaletteFromMicrolink(palette);
  }
  
  // 4. Fallback final avec screenshot si disponible
  const screenshotUrl = data?.screenshot?.url;
  if (screenshotUrl && typeof window !== 'undefined') {
    try {
      console.log('📸 Analyse screenshot en fallback...');
      const screenshotColors = await extractColorsFromLogo(screenshotUrl);
      if (screenshotColors.length >= 2) {
        return generateBrandThemeFromColors(screenshotColors);
      }
    } catch (error) {
      console.error('❌ Erreur analyse screenshot:', error);
    }
  }
  
  // 5. Fallback ultime
  console.log('⚠️ Fallback couleurs par défaut');
  return generateBrandThemeFromColors(['#841b60', '#dc2626', '#ffffff', '#f8fafc']);
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

// ---- AMÉLIORATION : Génère une palette intelligente à partir des couleurs du logo ----
export function generateBrandThemeFromColors(colors: string[]): BrandPalette {
  // Trier les couleurs par luminosité pour avoir une hiérarchie logique
  const sortedColors = colors.sort((a, b) => {
    const getLuminance = (hex: string) => {
      const rgb = hexToRgb(hex);
      return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
    };
    return getLuminance(b) - getLuminance(a); // Du plus clair au plus foncé
  });

  // Logique intelligente pour assigner les rôles
  const primaryColor = sortedColors.find(color => {
    const lum = getLuminance(color);
    return lum > 0.1 && lum < 0.8; // Ni trop sombre ni trop clair
  }) || sortedColors[0] || '#841b60';

  const secondaryColor = sortedColors.find(color => 
    color !== primaryColor && Math.abs(getLuminance(color) - getLuminance(primaryColor)) > 0.2
  ) || sortedColors[1] || primaryColor;

  const accentColor = sortedColors.find(color => 
    color !== primaryColor && color !== secondaryColor
  ) || sortedColors[2] || primaryColor;

  // Background : la couleur la plus claire, ou blanc par défaut
  const backgroundColor = sortedColors.find(color => getLuminance(color) > 0.8) || '#ffffff';

  const textColor = getAccessibleTextColor(accentColor);

  return {
    primaryColor,
    secondaryColor,
    accentColor,
    backgroundColor,
    textColor
  };
}

// Fonction utilitaire pour calculer la luminance
function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
}

// --- Utilisé dans l'application pour mapper la palette sur la roue / bouton etc ---
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
