import polka from 'polka';
import { read } from '../utils/pipeInbound';
import { getItem, getItems } from '../services/items';

const items = polka().get('/', read(getItems)).get('/:id', read(getItem));

export default items;
