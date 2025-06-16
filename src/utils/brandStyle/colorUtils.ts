
export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r, g, b];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const h = x.toString(16);
        return h.length === 1 ? "0" + h : h;
      })
      .join("")
  );
}

export function getAccessibleTextColor(backgroundColor: string): string {
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
}

export function getColorSaturation(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  return max === 0 ? 0 : (max - min) / max;
}

export function isGrayish(hex: string): boolean {
  const [r, g, b] = hexToRgb(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : (max - min) / max;
  return saturation < 0.2;
}

export function isTooLight(hex: string): boolean {
  return getLuminance(hex) > 0.95;
}

export function isTooDark(hex: string): boolean {
  return getLuminance(hex) < 0.05;
}

export function deduplicateColors(colors: string[], threshold = 40): string[] {
  const unique: string[] = [];
  const distance = (c1: string, c2: string) => {
    const [r1, g1, b1] = hexToRgb(c1);
    const [r2, g2, b2] = hexToRgb(c2);
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
  };
  colors.forEach((color) => {
    if (!unique.some((u) => distance(u, color) < threshold)) {
      unique.push(color);
    }
  });
  return unique;
}
