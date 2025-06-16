import { test } from 'node:test';
import assert from 'node:assert/strict';
import { useQuickCampaignStore } from '../src/stores/quickCampaignStore';

test('quickCampaignStore setCampaignName and reset', () => {
  useQuickCampaignStore.setState({ campaignName: 'Initial' });
  useQuickCampaignStore.getState().setCampaignName('Changed');
  assert.equal(useQuickCampaignStore.getState().campaignName, 'Changed');
  useQuickCampaignStore.getState().reset();
  assert.equal(useQuickCampaignStore.getState().campaignName, 'Ma Nouvelle Campagne');
});

test('generatePreviewCampaign reflects segment count', () => {
  useQuickCampaignStore.getState().setSelectedGameType('wheel');
  useQuickCampaignStore.getState().setSegmentCount(3);
  const preview = useQuickCampaignStore.getState().generatePreviewCampaign();
  assert.equal(preview.gameConfig.wheel.segments.length, 3);
});
