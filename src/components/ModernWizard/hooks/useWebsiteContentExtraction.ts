
// Hook pour extraire le texte principal d'un site via Firecrawl API
import { useState, useEffect } from "react";

// Adapté d'un service Firecrawl JS minimal (nous utilisons fetch ici pour un simple markdown)
export function useWebsiteContentExtraction(siteUrl: string | undefined) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteUrl || siteUrl.trim() === "") {
      setContent(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    // Pour plus de sécurité : Firecrawl fonctionne uniquement sur des sites accessibles en public
    const crawl = async () => {
      try {
        // Utiliser l'API publique de Firecrawl.js si présente, sinon fallback à un fetch d'un backend
        // NB : Pour un vrai projet, stockez la clé API Firecrawl dans les secrets !
        const apiKey = import.meta.env.VITE_FIRECRAWL_API_KEY || localStorage.getItem("firecrawl_api_key");
        if (!apiKey) throw new Error("Aucune clé Firecrawl disponible !");
        // Pour la démo : endpoint Firecrawl REST
        const resp = await fetch('https://api.firecrawl.dev/v1/scrape', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
          },
          body: JSON.stringify({
            url: siteUrl,
            scrapeOptions: { formats: ["markdown"] },
            limit: 1
          })
        });
        const crawlData = await resp.json();
        // Chercher le markdown principal
        let mainText = null;
        if (crawlData?.data?.[0]?.markdown) mainText = crawlData.data[0].markdown;
        else if (typeof crawlData.text === "string") mainText = crawlData.text;
        if (!cancelled) setContent(mainText || "");
      } catch (e: any) {
        if (!cancelled) {
          setError(
            "Erreur lors de l'analyse du site : " +
              (e.message || "erreur inconnue")
          );
          setContent(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    crawl();

    return () => {
      cancelled = true;
    };
  }, [siteUrl]);
  return { content, loading, error };
}
