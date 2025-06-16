
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

export interface BrandColors {
  primary: string;
  secondary: string;
  accent?: string;
}
