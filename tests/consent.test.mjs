import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../src/components/ConsentInit.astro', import.meta.url), 'utf8').match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
function setup(stored = null, blocked = false) {
  const listeners = {};
  const storage = { value:stored };
  const window = { dispatchEvent() {}, addEventListener(name, callback) { listeners[name] = callback; } };
  runInNewContext(source, {
    window, Date,
    CustomEvent: class { constructor(type, data) { this.type = type; this.detail = data.detail; } },
    localStorage: {
      getItem() { if (blocked) throw Error('blocked'); return storage.value; },
      setItem(key, value) { if (blocked) throw Error('blocked'); storage.value = value; },
    },
  });
  return { api:window.a2budConsent, queue:window.dataLayer, storage, listeners };
}
const states = call => Object.values(call[2]);
test('all four v2 signals default to denied', () => {
  const { api, queue } = setup();
  assert.equal(api.get(), null);
  assert.equal(queue[0][1], 'default');
  assert.deepEqual(states(queue[0]), Array(4).fill('denied'));
});
test('accept, revoke and persist choices', () => {
  const { api, queue, storage } = setup();
  assert.equal(api.save(true, true), true);
  assert.deepEqual(states(queue.at(-1)), Array(4).fill('granted'));
  api.save(false, false);
  assert.deepEqual(states(queue.at(-1)), Array(4).fill('denied'));
  assert.equal(JSON.parse(storage.value).marketing, false);
});
test('analytics and marketing are independent', () => {
  const { api, queue } = setup();
  api.save(true, false);
  assert.deepEqual(states(queue.at(-1)), ['granted','denied','denied','denied']);
  api.save(false, true);
  assert.deepEqual(states(queue.at(-1)), ['denied','granted','granted','granted']);
});
test('valid saved choice restores after default', () => {
  const stored = JSON.stringify({version:1,analytics:true,marketing:false,savedAt:Date.now()});
  const { queue } = setup(stored);
  assert.equal(queue[0][1], 'default');
  assert.equal(queue[1][1], 'update');
  assert.deepEqual(states(queue[1]), ['granted','denied','denied','denied']);
});
test('expired, future, corrupt and obsolete choices are rejected', () => {
  for (const value of ['broken', JSON.stringify({version:0,analytics:true,marketing:true,savedAt:Date.now()}),
    ...[Date.now()-181*86400000, Date.now()+86400000].map(savedAt => JSON.stringify({version:1,analytics:true,marketing:true,savedAt}))]) {
    const { api, queue } = setup(value);
    assert.equal(api.get(), null);
    assert.equal(queue.length, 1);
  }
});
test('blocked storage does not prevent updates', () => {
  const { api, queue } = setup(null, true);
  assert.equal(api.save(true, false), false);
  assert.equal(queue.at(-1)[2].analytics_storage, 'granted');
});
test('clearing consent in another tab revokes signals', () => {
  const { api, queue, storage, listeners } = setup();
  api.save(true, true);
  storage.value = null;
  listeners.storage({key:'a2bud-consent-v1'});
  assert.equal(api.get(), null);
  assert.deepEqual(states(queue.at(-1)), Array(4).fill('denied'));
});
