import polka from 'polka';

import { mutate, read } from '../utils/pipeInbound';
import { createCart, addItemToCart, getCartItems } from '../services/carts';

const carts = polka()
  .post('/', mutate(createCart))
  .get('/:id/items', read(getCartItems))
  .post('/:id/items', mutate(addItemToCart));

export default carts;
