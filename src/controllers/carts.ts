import polka from 'polka';

const carts = polka()
  .post('/')
  .get('/:id/items')
  .post('/:id/items')
  .put('/:id/items/:id')
  .delete('/:id/items/:id');

export default carts;
