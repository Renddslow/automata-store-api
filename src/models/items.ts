import { Cursor } from '../types';
import mediator from '../mediator';
import { ItemData } from '../services/items/types';
import formatQuery from '../utils/formatQuery';

export const list = (cursor: Cursor): Promise<ItemData[]> => {
  const query = `
SELECT i.*, s.label, s.spec_value as value, p.amount, p.valid_to, p.sale_name
    FROM items i 
    LEFT JOIN item_specs s ON i.id = s.item_id
    LEFT JOIN (
        SELECT * FROM item_pricing_books ipb
        WHERE ipb.valid_from < ? AND ipb.valid_to > ?
    ) as p ON i.id = p.item_id
    WHERE i.id ${cursor.direction === 'next' ? '>' : '<'} ?
    LIMIT ?`;
  const now = new Date().toISOString();
  return mediator.call('query', formatQuery(query, [now, now, cursor.cursor || 0, cursor.limit]));
};
