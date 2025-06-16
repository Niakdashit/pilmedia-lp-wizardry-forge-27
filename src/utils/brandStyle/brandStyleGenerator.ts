
import { BrandTheme, BrandStyle, BrandPalette } from './types';
import { getAccessibleTextColor } from './colorUtils';
import { fetchBrandData } from './apiClient';
import { extractColorsFromLogo } from './colorExtractor';
import { generateAdvancedPaletteFromColors, extractCompletePaletteFromBrandfetch } from './paletteGenerator';

export async function generateBrandThemeFromUrl(
  url: string,
): Promise<BrandTheme> {
  try {
    if (!/^https?:/.test(url)) url = `https://${url}`;
    const domain = new URL(url).hostname;
    let brandData: any = null;
    let logoUrl: string | undefined;
    try {
      brandData = await fetchBrandData(`https://${domain}`);
      logoUrl = brandData?.logos?.[0]?.formats?.[0]?.src;
    } catch (err) {
      console.warn("⚠️ Brandfetch error:", err);
    }
    // 1. Couleurs directes Brandfetch
    if (brandData?.colors?.length) {
      const colors = brandData.colors.map((c: any) => c.hex || c);
      const primary = colors[0];
      const secondary = colors[1] || primary;
      const accent = colors[2] || "#ffffff";
      return {
        customColors: {
          primary,
          secondary,
          accent,
          text: getAccessibleTextColor(accent),
        },
        logoUrl,
      };
    }
    // 2. Extraction des couleurs du logo avec ColorThief (priorité absolue)
    if (logoUrl && typeof window !== "undefined") {
      try {
        const logoColors = await extractColorsFromLogo(logoUrl);
        if (logoColors.length >= 2) {
          const palette = generateAdvancedPaletteFromColors(logoColors);
          return {
            customColors: {
              primary: palette.primaryColor,
              secondary: palette.secondaryColor,
              accent: palette.accentColor,
              text: palette.textColor,
            },
            logoUrl,
          };
        }
      } catch (error) {
        console.warn("⚠️ Échec extraction logo ColorThief:", error);
      }
    }
    // 3. Fallback final : Palette par défaut
    return {
      customColors: {
        primary: "#841b60",
        secondary: "#dc2626",
        accent: "#ffffff",
        text: "#ffffff",
      },
      logoUrl,
    };
  } catch (error) {
    // Palette d'urgence
    return {
      customColors: {
        primary: "#841b60",
        secondary: "#dc2626",
        accent: "#ffffff",
        text: "#ffffff",
      },
    };
  }
}

export async function generateBrandThemeFromFile(
  file: File,
): Promise<BrandTheme> {
  const logoUrl = URL.createObjectURL(file);
  try {
    const logoColors = await extractColorsFromLogo(logoUrl);
    if (logoColors.length >= 2) {
      const palette = generateAdvancedPaletteFromColors(logoColors);
      return {
        customColors: {
          primary: palette.primaryColor,
          secondary: palette.secondaryColor,
          accent: palette.accentColor,
          text: palette.textColor,
        },
        logoUrl,
      };
    }
  } catch (error) {
    console.warn("⚠️ Échec extraction logo local:", error);
  }
  return {
    customColors: {
      primary: "#841b60",
      secondary: "#dc2626",
      accent: "#ffffff",
      text: "#ffffff",
    },
    logoUrl,
  };
}

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

export async function extractBrandPaletteFromBrandfetch(
  data: any,
): Promise<BrandPalette> {
  const colors = data?.colors || [];
  return extractCompletePaletteFromBrandfetch(colors);
}
