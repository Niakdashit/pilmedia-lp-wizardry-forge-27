
async function fetchBrandfetchData(domain: string): Promise<any> {
  const apiKey =
    (typeof import.meta !== "undefined" &&
      (import.meta as any).env?.VITE_BRANDFETCH_KEY) ||
    process.env.VITE_BRANDFETCH_KEY;
  if (!apiKey) {
    console.warn(
      "[BrandStyleAnalyzer] VITE_BRANDFETCH_KEY is undefined. Skipping Brandfetch request.",
    );
    return null;
  }
  const res = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) throw new Error("Brandfetch request failed");
  return res.json();
}

export async function fetchBrandData(siteUrl: string): Promise<any> {
  const domain = new URL(siteUrl).hostname;
  const data = await fetchBrandfetchData(domain);
  return data || {};
}
