
import { BrandPalette } from './types';
import { getAccessibleTextColor, getLuminance, getColorSaturation } from './colorUtils';

export function generateAdvancedPaletteFromColors(
  colors: string[],
): BrandPalette {
  // Tri par saturation puis par luminance (plus saturée/vive en premier)
  const sortedColors = colors.sort((a, b) => {
    const satA = getColorSaturation(a);
    const satB = getColorSaturation(b);
    const lumA = getLuminance(a);
    const lumB = getLuminance(b);
    if (Math.abs(satA - satB) > 0.1) {
      return satB - satA;
    }
    return Math.abs(lumB - 0.5) - Math.abs(lumA - 0.5);
  });
  const primaryColor = sortedColors[0] || "#841b60";
  const secondaryColor =
    findContrastingColor(sortedColors, primaryColor) ||
    sortedColors[1] ||
    "#dc2626";
  const accentColor =
    findAccentColor(sortedColors, primaryColor, secondaryColor) || "#ffffff";
  const textColor = getAccessibleTextColor(accentColor);
  return {
    primaryColor,
    secondaryColor,
    accentColor,
    backgroundColor: "#ffffff",
    textColor,
  };
}

function findContrastingColor(
  colors: string[],
  excludeColor: string,
): string | null {
  const excludeLuminance = getLuminance(excludeColor);
  for (const color of colors) {
    if (color === excludeColor) continue;
    const luminance = getLuminance(color);
    const contrast = Math.abs(luminance - excludeLuminance);
    if (contrast > 0.3) return color;
  }
  return null;
}

function findAccentColor(
  colors: string[],
  primaryColor: string,
  secondaryColor: string,
): string | null {
  for (const color of colors) {
    if (color === primaryColor || color === secondaryColor) continue;
    const luminance = getLuminance(color);
    if (luminance > 0.2 && luminance < 0.8) return color;
  }
  return null;
}

export function extractCompletePaletteFromBrandfetch(
  palette: any[],
): BrandPalette {
  const colors = palette.map((c) => c.hex || c).filter(Boolean);
  const primaryColor = colors[0] || "#841b60";
  const secondaryColor = colors[1] || primaryColor;
  const accentColor = colors[2] || "#ffffff";
  const backgroundColor = "#ffffff";
  const textColor = getAccessibleTextColor(accentColor);
  return {
    primaryColor,
    secondaryColor,
    accentColor,
    backgroundColor,
    textColor,
  };
}

export function generateBrandThemeFromMicrolinkPalette(
  palette: any,
): BrandPalette {
  return extractCompletePaletteFromBrandfetch(palette);
}
