import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getCampaignBackgroundImage } from '../src/utils/background';

test('getCampaignBackgroundImage returns desktop background', () => {
  const campaign = { design: { backgroundImage: 'desktop.jpg', mobileBackgroundImage: 'mobile.jpg' } };
  assert.equal(getCampaignBackgroundImage(campaign), 'desktop.jpg');
});

test('getCampaignBackgroundImage returns mobile background when device is mobile', () => {
  const campaign = { design: { backgroundImage: 'desktop.jpg', mobileBackgroundImage: 'mobile.jpg' } };
  assert.equal(getCampaignBackgroundImage(campaign, 'mobile'), 'mobile.jpg');
});
