import polka from 'polka';

import { mutate } from '../utils/pipeInbound';
import { createCart, addItemToCart } from '../services/carts';

const carts = polka()
  .post('/', mutate(createCart))
  .get('/:id/items')
  .post('/:id/items', mutate(addItemToCart))
  .patch('/:id/items/:id')
  .delete('/:id/items/:id');

export default carts;
