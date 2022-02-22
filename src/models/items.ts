import mysql from 'mysql2';

import { Cursor } from '../types';
import mediator from '../mediator';

export const list = (cursor: Cursor): Promise<unknown> => {
  const query = `SELECT * FROM items WHERE id ${cursor.direction === 'next' ? '>' : '<'} ? LIMIT ?`;
  return mediator.call('query', mysql.format(query, [cursor.cursor || 0, cursor.limit]));
};
