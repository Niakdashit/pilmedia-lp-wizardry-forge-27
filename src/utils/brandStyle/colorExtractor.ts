
import { rgbToHex, isGrayish, isTooLight, isTooDark, deduplicateColors } from './colorUtils';

export async function extractColorsFromLogo(
  logoUrl: string,
): Promise<string[]> {
  try {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    return new Promise((resolve, reject) => {
      img.onload = async () => {
        try {
          const { default: ColorThief } = await import('colorthief');
          const colorThief = new ColorThief();
          const dominantColor = colorThief.getColor(img, 5);
          const palette = colorThief.getPalette(img, 8, 5);
          const dominantHex = rgbToHex(
            dominantColor[0],
            dominantColor[1],
            dominantColor[2],
          );
          const paletteHex = palette.map(([r, g, b]: number[]) =>
            rgbToHex(r, g, b),
          );
          const allColors = [dominantHex, ...paletteHex];
          // Filtrage : ni gris, ni trop clair, ni trop foncé
          const filteredColors = allColors.filter((color) => {
            return (
              !isGrayish(color) && !isTooLight(color) && !isTooDark(color)
            );
          });
          const unique = deduplicateColors(filteredColors, 40).filter(Boolean);
          const finalColors =
            unique.length >= 2 ? unique.slice(0, 5) : allColors.slice(0, 3);
          resolve(finalColors);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error("Logo load failed"));
      img.src = logoUrl;
    });
  } catch (error) {
    return [];
  }
}
