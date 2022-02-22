import test from 'ava';

import { read, ReadHandler } from './pipeInbound';
import { JsonApiBody } from '../types';

test('read - returns a function', (t) => {
  t.is(typeof read(() => ({ errors: [] })), 'function');
});

test('read - polka handler calls JSON method', (t) => {
  t.plan(1);
  const res = {
    json: (payload) => {
      t.deepEqual(payload, { errors: [] });
    },
  };
  read(() => ({ errors: [] }))({}, res);
});

test('read - calls handler with payload when no id is present', (t) => {
  t.plan(3);
  const req = {
    query: { count: '2' },
    params: {},
    user: { cartID: '' },
  };

  const handler: ReadHandler = (id, query, user) => {
    t.deepEqual(query, { count: '2' });
    t.is(user.cartID, '');
    t.is(id, null);
    return { errors: [] };
  };

  read(handler)(req, { json: () => {} });
});

test('read - calls handler with payload when id is present', (t) => {
  t.plan(3);
  const req = {
    query: { count: '2' },
    params: { id: '12' },
    user: { cartID: '' },
  };

  const handler: ReadHandler = (id, query, user) => {
    t.deepEqual(query, { count: '2' });
    t.is(user.cartID, '');
    t.is(id, '12');
    return { errors: [] };
  };

  read(handler)(req, { json: () => {} });
});

test('read - returns a status of 200 when no errors are present', (t) => {
  t.plan(1);
  const req = { query: {}, params: {}, user: {} };
  const res = {
    json: (_, statusCode) => {
      t.is(statusCode, 200);
    },
  };
  read((): JsonApiBody<any> => ({ data: { type: '', attributes: {} } }))(req, res);
});

test('read - returns a status of 400 when errors are present', (t) => {
  t.plan(1);
  const req = { query: {}, params: {}, user: {} };
  const res = {
    json: (_, statusCode) => {
      t.is(statusCode, 400);
    },
  };
  read(() => ({ errors: [] }))(req, res);
});
