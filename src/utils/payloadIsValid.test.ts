import test from 'ava';

import payloadIsValid from './payloadIsValid';

const PAYLOAD = {
  data: {
    type: '',
    attributes: {
      foo: 'hello',
      bar: 'world',
    },
  },
};

test('payloadIsValid - returns an object', (t) => {
  const res = payloadIsValid(
    {
      data: {
        type: '',
        attributes: {},
      },
    },
    {},
  );
  t.is(res.toString(), '[object Object]');
  t.is(typeof res.isValid, 'boolean');
  t.true(Array.isArray(res.errors));
});

test(`payloadIsValid - returns true when attributes match on booleans`, (t) => {
  const schema = {
    foo: true,
  };
  t.true(payloadIsValid(PAYLOAD, schema).isValid);
});

test('payloadIsValid - returns true when attributes match on functions', (t) => {
  const schema = {
    foo: (v) => v === 'hello',
  };
  t.true(payloadIsValid(PAYLOAD, schema).isValid);
});

test('payloadIsValue - returns false when attributes are missing - boolean', (t) => {
  const schema = {
    baz: true,
  };
  const res = payloadIsValid(PAYLOAD, schema);
  t.false(res.isValid);
  t.deepEqual(res.errors, [
    {
      status: 400,
      code: 'AttributesError',
      title: 'Missing attribute or invalid value',
      detail:
        'Required attribute "baz" was not supplied or had an invalid value at data.attributes.baz',
    },
  ]);
});

test('payloadIsValue - returns false when attributes are missing - function', (t) => {
  const schema = {
    foo: (v) => typeof v === 'number',
  };
  const res = payloadIsValid(PAYLOAD, schema);
  t.false(res.isValid);
  t.deepEqual(res.errors, [
    {
      status: 400,
      code: 'AttributesError',
      title: 'Missing attribute or invalid value',
      detail:
        'Required attribute "foo" was not supplied or had an invalid value at data.attributes.foo',
    },
  ]);
});
