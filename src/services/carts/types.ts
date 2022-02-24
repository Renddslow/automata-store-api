import { ItemData } from '../items/types';
import { ResultSetHeader } from 'mysql2';

export type CartItemData = Omit<ItemData, 'specs'> & {
  cart_item_id: string;
  id: string;
  cart_id: string;
  item_id: string;
  price_on_add: number;
  created: string;
  updated: string;
  quantity: number;
};

export type ModifiedResultSet = ResultSetHeader & {
  generatedId: string;
};
