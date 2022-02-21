import polka from 'polka';

const items = polka().get('/').get('/:id');

export default items;
