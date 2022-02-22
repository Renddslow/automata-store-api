import test from 'ava';
import sinon from 'sinon';

import { list } from './items';
import mediator from '../mediator';

let remove;
let stub;

const date = '2020-01-01T00:00:00.000Z';

test.before(() => {
  stub = sinon.stub(Date.prototype, 'toISOString').returns(date);
});

test.after(() => {
  stub.restore();
});

test('list - returns a promise', (t) => {
  remove = mediator.provide('query', () => Promise.resolve());
  const p = list({ cursor: '', limit: 24, direction: 'next' });
  t.is(p.toString(), '[object Promise]');
});

test('list - queries for > 0 when no cursor provided - next', async (t) => {
  t.plan(1);

  remove();
  remove = mediator.provide('query', (q) => {
    t.is(
      q,
      [
        'SELECT i.*, s.label, s.spec_value as value, p.amount, p.valid_to, p.sale_name',
        'FROM items i',
        'LEFT JOIN item_specs s ON i.id = s.item_id',
        'LEFT JOIN ( SELECT * FROM item_pricing_books ipb',
        `WHERE ipb.valid_from < '${date}' AND ipb.valid_to > '${date}'`,
        ') as p ON i.id = p.item_id',
        'WHERE i.id > 0 LIMIT 24',
      ].join(' '),
    );
    return Promise.resolve();
  });
  await list({ cursor: '', limit: 24, direction: 'next' });
});

test('list - queries for < 0 when no cursor provided - prev', async (t) => {
  t.plan(1);

  remove();
  remove = mediator.provide('query', (q) => {
    t.is(
      q,
      [
        'SELECT i.*, s.label, s.spec_value as value, p.amount, p.valid_to, p.sale_name',
        'FROM items i',
        'LEFT JOIN item_specs s ON i.id = s.item_id',
        'LEFT JOIN ( SELECT * FROM item_pricing_books ipb',
        `WHERE ipb.valid_from < '${date}' AND ipb.valid_to > '${date}'`,
        ') as p ON i.id = p.item_id',
        'WHERE i.id < 0 LIMIT 24',
      ].join(' '),
    );
    return Promise.resolve();
  });
  await list({ cursor: '', limit: 24, direction: 'prev' });
});

test('list - queries for > 12 when cursor provided - next', async (t) => {
  t.plan(1);

  remove();
  remove = mediator.provide('query', (q) => {
    t.is(
      q,
      [
        'SELECT i.*, s.label, s.spec_value as value, p.amount, p.valid_to, p.sale_name',
        'FROM items i',
        'LEFT JOIN item_specs s ON i.id = s.item_id',
        'LEFT JOIN ( SELECT * FROM item_pricing_books ipb',
        `WHERE ipb.valid_from < '${date}' AND ipb.valid_to > '${date}'`,
        ') as p ON i.id = p.item_id',
        'WHERE i.id > 12 LIMIT 24',
      ].join(' '),
    );
    return Promise.resolve();
  });
  await list({ cursor: 12, limit: 24, direction: 'next' });
});
