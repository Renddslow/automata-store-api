import test from 'ava';

import { list } from './items';
import mediator from '../mediator';

test('list - returns a promise', (t) => {
  const remove = mediator.provide('query', () => new Promise(() => {}));
  t.is(list({ cursor: '', limit: 24, direction: 'next' }).toString(), '[object Promise]');
  remove();
});
