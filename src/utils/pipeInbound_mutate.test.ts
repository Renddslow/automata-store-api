import test from 'ava';

import { mutate, MutationHandler } from './pipeInbound';
import { JsonApiBody } from '../types';

test('mutate - returns a function', (t) => {
  t.is(typeof mutate(() => ({ errors: [] })), 'function');
});

test('mutate - polka handler calls JSON method', (t) => {
  t.plan(1);
  const res = {
    json: (payload) => {
      t.deepEqual(payload, { errors: [] });
    },
  };
  mutate(() => ({ errors: [] }))({}, res);
});

test('mutate - calls handler with payload when no id is present', (t) => {
  t.plan(4);
  const req = {
    body: {
      data: {
        type: '',
        attributes: {},
      },
    },
    query: {},
    params: {},
    user: { cartID: '' },
  };

  const handler: MutationHandler = (id, body: JsonApiBody<any>, query, user) => {
    t.deepEqual(body, {
      data: {
        type: '',
        attributes: {},
      },
    });
    t.deepEqual(query, {});
    t.is(user.cartID, '');
    t.is(id, null);
    return { errors: [] };
  };

  mutate(handler)(req, { json: () => {} });
});

test('mutate - calls handler with payload when id is present', (t) => {
  t.plan(4);
  const req = {
    body: {
      data: {
        type: '',
        attributes: {},
      },
    },
    query: {},
    params: { id: '12' },
    user: { cartID: '' },
  };

  const handler: MutationHandler = (id, body: JsonApiBody<any>, query, user) => {
    t.deepEqual(body, {
      data: {
        type: '',
        attributes: {},
      },
    });
    t.deepEqual(query, {});
    t.is(user.cartID, '');
    t.is(id, '12');
    return { errors: [] };
  };

  mutate(handler)(req, { json: () => {} });
});

test('mutate - returns a status of 200 when no errors are present', (t) => {
  t.plan(1);
  const req = { query: {}, params: {}, user: {}, body: {} };
  const res = {
    json: (_, statusCode) => {
      t.is(statusCode, 200);
    },
  };
  mutate((): JsonApiBody<any> => ({ data: { type: '', attributes: {} } }))(req, res);
});

test('mutate - returns a status of 400 when errors are present', (t) => {
  t.plan(1);
  const req = { query: {}, params: {}, user: {}, body: {} };
  const res = {
    json: (_, statusCode) => {
      t.is(statusCode, 400);
    },
  };
  mutate(() => ({ errors: [] }))(req, res);
});
