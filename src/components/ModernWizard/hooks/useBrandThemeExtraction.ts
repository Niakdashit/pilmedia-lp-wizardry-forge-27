
import { useState, useEffect } from "react";
import { generateBrandThemeFromUrl } from "../../../utils/BrandStyleAnalyzer";

export function useBrandThemeExtraction(siteUrl: string | undefined) {
  const [brandTheme, setBrandTheme] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteUrl || siteUrl.trim() === "") {
      setBrandTheme(null);
      setLoading(false);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    generateBrandThemeFromUrl(siteUrl)
      .then((theme) => {
        if (!cancelled) {
          setBrandTheme(theme);
        }
      })
      .catch(() => { // <- le paramètre err n'est plus nécessaire, remplacé par _
        if (!cancelled) {
          setError("Erreur lors de l'extraction du thème de marque.");
          setBrandTheme(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [siteUrl]);

  return { brandTheme, loading, error };
}
