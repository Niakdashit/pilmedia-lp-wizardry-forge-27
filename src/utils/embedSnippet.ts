export function generateEmbedSnippet(campaignId: string, width = 600, height = 800): string {
  const baseUrl = (import.meta as any).env?.VITE_PUBLIC_URL || 'https://example.com';
  const src = `${baseUrl}/embed/campaign/${campaignId}`;
  return `<iframe src="${src}" width="${width}" height="${height}" style="border:0;max-width:100%;"></iframe>`;
}
