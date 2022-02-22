import test from 'ava';

import { list } from './items';
import mediator from '../mediator';

let remove;

test('list - returns a promise', (t) => {
  remove = mediator.provide('query', () => Promise.resolve());
  const p = list({ cursor: '', limit: 24, direction: 'next' });
  t.is(p.toString(), '[object Promise]');
});

test('list - queries for > 0 when no cursor provided - next', async (t) => {
  t.plan(1);
  remove();
  remove = mediator.provide('query', (q) => {
    t.is(q, 'SELECT * FROM items WHERE id > 0 LIMIT 24');
    return Promise.resolve();
  });
  await list({ cursor: '', limit: 24, direction: 'next' });
});

test('list - queries for < 0 when no cursor provided - prev', async (t) => {
  t.plan(1);
  remove();
  remove = mediator.provide('query', (q) => {
    t.is(q, 'SELECT * FROM items WHERE id < 0 LIMIT 24');
    return Promise.resolve();
  });
  await list({ cursor: '', limit: 24, direction: 'prev' });
});

test('list - queries for > 12 when cursor provided - next', async (t) => {
  t.plan(1);
  remove();
  remove = mediator.provide('query', (q) => {
    t.is(q, 'SELECT * FROM items WHERE id > 12 LIMIT 24');
    return Promise.resolve();
  });
  await list({ cursor: 12, limit: 24, direction: 'next' });
});
