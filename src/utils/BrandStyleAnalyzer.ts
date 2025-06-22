
// Main exports for compatibility
export type { BrandStyle, BrandPalette, BrandTheme, BrandColors } from './brandStyle/types';
export { getAccessibleTextColor } from './brandStyle/colorUtils';
export { generateBrandThemeFromUrl, generateBrandThemeFromFile, analyzeBrandStyle, extractBrandPaletteFromBrandfetch } from './brandStyle/brandStyleGenerator';
export { extractColorsFromLogo } from './brandStyle/colorExtractor';
export { generateAdvancedPaletteFromColors, extractCompletePaletteFromBrandfetch, generateBrandThemeFromMicrolinkPalette } from './brandStyle/paletteGenerator';
export { applyBrandStyleToWheel } from './brandStyle/brandWheelStyler';

// Legacy export for backward compatibility
export { getAccessibleTextColor as getReadableTextColor } from './brandStyle/colorUtils';
