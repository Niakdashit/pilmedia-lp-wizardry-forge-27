import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAccessibleTextColor, generateAdvancedPaletteFromColors, extractCompletePaletteFromBrandfetch } from '../src/utils/BrandStyleAnalyzer';

test('getAccessibleTextColor returns contrasting color', () => {
  assert.equal(getAccessibleTextColor('#ffffff'), '#000000');
  assert.equal(getAccessibleTextColor('#000000'), '#ffffff');
});

test('generateAdvancedPaletteFromColors picks first color as primary', () => {
  const palette = generateAdvancedPaletteFromColors(['#111111', '#eeeeee']);
  assert.equal(palette.primaryColor, '#111111');
});

test('extractCompletePaletteFromBrandfetch transforms palette', () => {
  const res = extractCompletePaletteFromBrandfetch([{ hex: '#ff0000' }, '#00ff00']);
  assert.equal(res.primaryColor, '#ff0000');
  assert.equal(res.secondaryColor, '#00ff00');
});
