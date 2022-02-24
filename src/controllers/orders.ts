import polka from 'polka';

const orders = polka().post('/').get('/:id').patch('/:id');

export default orders;
