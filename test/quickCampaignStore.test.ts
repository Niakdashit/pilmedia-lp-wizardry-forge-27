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
  assert.equal(preview.config.roulette.segments.length, 3);
});

test('pointer image url is included in preview', () => {
  useQuickCampaignStore.getState().setPointerImageUrl('http://example.com/pointer.png');
  const preview = useQuickCampaignStore.getState().generatePreviewCampaign();
  assert.equal(preview.design.pointerImage, 'http://example.com/pointer.png');
});
