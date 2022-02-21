import polka from 'polka';

const customers = polka().get('/').post('/').get('/:id');

export default customers;
