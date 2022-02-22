import { Cursor } from '../types';
import mediator from '../mediator';
import { ItemData } from '../services/items/types';
import formatQuery from '../utils/formatQuery';

export const list = (cursor: Cursor): Promise<ItemData[]> => {
  const query = `
SELECT i.*, s.label, s.spec_value as value 
    FROM items i 
    INNER JOIN item_specs s ON i.id = s.item_id  
    WHERE i.id ${cursor.direction === 'next' ? '>' : '<'} ? 
    LIMIT ?`;
  return mediator.call('query', formatQuery(query, [cursor.cursor || 0, cursor.limit]));
};
