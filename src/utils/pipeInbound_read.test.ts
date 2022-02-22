import test from 'ava';

import { read, ReadHandler } from './pipeInbound';
import { JsonApiBody } from '../types';

test('read - returns a function', async (t) => {
  t.is(typeof (await read(() => ({ errors: [] }))), 'function');
});

test('read - polka handler calls JSON method', async (t) => {
  t.plan(1);
  const res = {
    json: (payload) => {
      t.deepEqual(payload, { errors: [] });
    },
  };
  await read(() => ({ errors: [] }))({}, res);
});

test('read - calls handler with payload when no id is present', async (t) => {
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

  await read(handler)(req, { json: () => {} });
});

test('read - calls handler with payload when id is present', async (t) => {
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

  await read(handler)(req, { json: () => {} });
});

test('read - returns a status of 200 when no errors are present', async (t) => {
  t.plan(1);
  const req = { query: {}, params: {}, user: {} };
  const res = {
    json: (_, statusCode) => {
      t.is(statusCode, 200);
    },
  };
  await read((): JsonApiBody<any> => ({ data: { type: '', attributes: {} } }))(req, res);
});

test('read - returns a status of 400 when errors are present', async (t) => {
  t.plan(1);
  const req = { query: {}, params: {}, user: {} };
  const res = {
    json: (_, statusCode) => {
      t.is(statusCode, 400);
    },
  };
  await read(() => ({ errors: [] }))(req, res);
});
