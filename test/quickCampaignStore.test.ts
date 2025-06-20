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

test('border radius is customizable', () => {
  useQuickCampaignStore.getState().setBorderRadius(24);
  const preview = useQuickCampaignStore.getState().generatePreviewCampaign();
  assert.equal(preview.design.borderRadius, '24px');
});

test('segment prizes propagate to preview', () => {
  useQuickCampaignStore.getState().setSelectedGameType('wheel');
  useQuickCampaignStore.getState().setPrize(0, { label: 'Prize A', image: 'img.png' });
  const preview = useQuickCampaignStore.getState().generatePreviewCampaign();
  assert.equal(preview.config.roulette.segments[0].label, 'Prize A');
  assert.equal(preview.config.roulette.segments[0].image, 'img.png');
});

test('analytics counters increment', () => {
  useQuickCampaignStore.getState().reset(); // Reset to avoid previous state
  useQuickCampaignStore.getState().recordClick();
  useQuickCampaignStore.getState().recordSpin();
  useQuickCampaignStore.getState().recordWin();
  const { stats } = useQuickCampaignStore.getState();
  assert.equal(stats.clicks, 1);
  assert.equal(stats.spins, 1);
  assert.equal(stats.wins, 1);
});
