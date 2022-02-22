import test from 'ava';

import getItems from './getItems';

test('getItems - returns object', (t) => {
  t.is(
    getItems(null, {}, { cartID: '' }, { limit: 0, cursor: '', direction: 'next' }).toString(),
    '[object Object]',
  );
});
