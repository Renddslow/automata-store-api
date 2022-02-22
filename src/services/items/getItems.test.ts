import test from 'ava';

import getItems from './getItems';
import mediator from '../../mediator';

let remove;

test('getItems - returns object', async (t) => {
  remove = mediator.provide('query', () => Promise.resolve());
  t.is(
    (
      await getItems(null, {}, { cartID: '' }, { limit: 0, cursor: '', direction: 'next' })
    ).toString(),
    '[object Object]',
  );
});
