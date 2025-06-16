import { test } from 'node:test';
import assert from 'node:assert/strict';
import { useNewsletterStore } from '../src/stores/newsletterStore';

test('newsletterStore add and remove module', () => {
  useNewsletterStore.setState({ modules: [] });
  const module = { id: '1', type: 'text', content: 'hello', settings: {} };
  useNewsletterStore.getState().addModule(module);
  assert.equal(useNewsletterStore.getState().modules.length, 1);
  useNewsletterStore.getState().removeModule('1');
  assert.equal(useNewsletterStore.getState().modules.length, 0);
});

test('newsletterStore update module', () => {
  useNewsletterStore.setState({ modules: [] });
  const module = { id: '1', type: 'text', content: 'hello', settings: {} };
  useNewsletterStore.getState().addModule(module);
  useNewsletterStore.getState().updateModule('1', { content: 'world' });
  assert.equal(useNewsletterStore.getState().modules[0].content, 'world');
});

