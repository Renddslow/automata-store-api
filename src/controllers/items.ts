import polka from 'polka';
import { read } from '../utils/pipeInbound';
import { getItems } from '../services/items';

const items = polka().get('/', read(getItems)).get('/:id');

export default items;
