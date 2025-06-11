import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateBrandThemeFromUrl } from '../src/utils/BrandStyleAnalyzer';

const originalFetch = globalThis.fetch;
function mockFetch() {
  return Promise.resolve({ ok: true, json: async () => ({}) });
}

test('generateBrandThemeFromUrl handles URLs without protocol', async () => {
  globalThis.fetch = mockFetch as any;
  await assert.doesNotReject(async () => {
    await generateBrandThemeFromUrl('sfr.fr');
  });
  globalThis.fetch = originalFetch;
});
