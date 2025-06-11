
import React from 'react';
import { analyzeBrandStyle, extractColorsFromLogo, generateBrandThemeFromColors } from '../../../../utils/BrandStyleAnalyzer';

interface CustomColors {
  primary: string;
  secondary: string;
  accent?: string;
}

export const useBrandColorExtraction = (
  customColors: CustomColors,
  logoUrl?: string,
  siteUrl?: string
) => {
  const [siteColors, setSiteColors] = React.useState<string[]>([]);
  const [logoColors, setLogoColors] = React.useState<string[]>([]);
  const [finalColors, setFinalColors] = React.useState(customColors);
  const [brandStyleExtracted, setBrandStyleExtracted] = React.useState(false);

  // Extraire les couleurs du site web avec plus de précision
  React.useEffect(() => {
    const extractSiteColors = async () => {
      if (siteUrl && typeof window !== 'undefined') {
        try {
          console.log('Analyse avancée des couleurs du site:', siteUrl);
          const brandStyle = await analyzeBrandStyle(siteUrl);
          console.log('Style de marque extrait:', brandStyle);
          
          if (brandStyle.primaryColor) {
            const colors = [
              brandStyle.primaryColor,
              brandStyle.secondaryColor,
              brandStyle.lightColor,
              brandStyle.darkColor
            ].filter((color): color is string => color !== undefined && color !== null);
            
            console.log('Couleurs du site extraites:', colors);
            setSiteColors(colors);
            setBrandStyleExtracted(true);
          }
        } catch (error) {
          console.log('Impossible d\'analyser les couleurs du site:', error);
          setBrandStyleExtracted(false);
        }
      }
    };

    extractSiteColors();
  }, [siteUrl]);

  // Extraire les couleurs du logo (fallback)
  React.useEffect(() => {
    const extractLogoColors = async () => {
      if (logoUrl && typeof window !== 'undefined') {
        try {
          console.log('Extraction des couleurs du logo:', logoUrl);
          const colors = await extractColorsFromLogo(logoUrl);
          console.log('Couleurs extraites du logo:', colors);
          setLogoColors(colors);
        } catch (error) {
          console.log('Impossible d\'extraire les couleurs du logo:', error);
        }
      }
    };

    extractLogoColors();
  }, [logoUrl]);

  // Calculer les couleurs finales avec priorité stricte aux couleurs du site
  React.useEffect(() => {
    // Priorité absolue: Couleurs extraites du site web
    if (siteColors.length >= 1 && brandStyleExtracted) {
      console.log('Application stricte des couleurs du site:', siteColors);
      
      // Utiliser directement les couleurs extraites sans génération de palette
      const newColors = {
        primary: siteColors[0], // Couleur principale exacte
        secondary: siteColors[1] || siteColors[0], // Couleur secondaire ou fallback
        accent: siteColors[2] || siteColors[1] || siteColors[0] // Couleur accent ou fallback
      };
      
      console.log('Couleurs finales appliquées directement depuis le site:', newColors);
      setFinalColors(newColors);
      return;
    }

    // Priorité 2: Couleurs personnalisées non-génériques
    if (customColors.primary && !isGenericColor(customColors.primary)) {
      console.log('Utilisation des couleurs personnalisées:', customColors);
      setFinalColors(customColors);
      return;
    }

    // Priorité 3: Couleurs du logo
    if (logoColors.length >= 2) {
      console.log('Génération du thème à partir des couleurs du logo:', logoColors);
      const palette = generateBrandThemeFromColors(logoColors);
      const newColors = {
        primary: palette.primaryColor,
        secondary: palette.secondaryColor,
        accent: palette.accentColor
      };
      console.log('Nouvelles couleurs générées depuis le logo:', newColors);
      setFinalColors(newColors);
      return;
    }

    // Fallback final
    console.log('Utilisation des couleurs par défaut:', customColors);
    setFinalColors(customColors);
  }, [customColors, siteColors, logoColors, brandStyleExtracted]);

  return {
    finalColors,
    siteColors,
    logoColors,
    brandStyleExtracted
  };
};

// Helper pour détecter les couleurs génériques
const isGenericColor = (color: string): boolean => {
  const genericColors = ['#841b60', '#3B82F6', '#8b5cf6', '#6b7280', '#374151'];
  return genericColors.includes(color);
};
