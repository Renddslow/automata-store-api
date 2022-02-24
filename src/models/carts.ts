import { v4 as uuid } from 'uuid';

import mediator from '../mediator';
import formatQuery from '../utils/formatQuery';
import { CartItemData, ModifiedResultSet } from '../services/carts/types';
import attachIDToResultSet from '../utils/attachIDToResultSet';

export const create = async (): Promise<ModifiedResultSet> => {
  const query = `
    INSERT INTO carts (id, created, updated) VALUES (?, ?, ?)
  `;

  const id = uuid();
  const attach = attachIDToResultSet(id);
  const now = new Date().toISOString();

  return attach(await mediator.call('query', formatQuery(query, [id, now, now])));
};

export const upsertCartItem = async (cartID: string, itemID: number): Promise<CartItemData> => {
  const itemExistsQuery = `
    SELECT id, quantity FROM cart_items ci
    WHERE ci.cart_id = ?
    AND ci.item_id = ?
  `;

  const [match] = await mediator.call('query', formatQuery(itemExistsQuery, [cartID, itemID]));

  let id = match?.id;
  const now = new Date().toISOString();

  const currentItemPriceQuery = `
    SELECT COALESCE(p.amount, i.msrp) as price 
    FROM items i 
    LEFT JOIN (
            SELECT * FROM item_pricing_books ipb
            WHERE ipb.valid_from < ? AND ipb.valid_to > ?
        ) as p ON i.id = p.item_id
    WHERE i.id = ?;
  `;

  const [currentPrice] = await mediator.call(
    'query',
    formatQuery(currentItemPriceQuery, [now, now, itemID]),
  );

  if (match) {
    const updateQuantityQuery = `
      UPDATE cart_items SET quantity = ?, updated = ?
      WHERE id = ?
  `;

    await mediator.call(
      'query',
      formatQuery(updateQuantityQuery, [match.quantity + 1, now, match.id]),
    );
  } else {
    const createCartItemQuery = `
      INSERT INTO cart_items (
        id,
        cart_id,
        item_id,
        price_on_add,
        created,
        updated,
        quantity
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    id = uuid();
    await mediator.call(
      'query',
      formatQuery(createCartItemQuery, [id, cartID, itemID, currentPrice.price, now, now, 1]),
    );
  }

  const query = `
    SELECT ci.id as cart_item_id, ci.*, i.*, p.amount, p.valid_to, p.sale_name
    FROM cart_items ci
    LEFT JOIN items i ON ci.item_id = i.id
    LEFT JOIN (
        SELECT * FROM item_pricing_books ipb
        WHERE ipb.valid_from < ? AND ipb.valid_to > ?
    ) as p ON i.id = p.item_id
    WHERE ci.id = ?
  `;

  return await mediator.call('query', formatQuery(query, [now, now, id]));
};

export const list = (id: string) => {
  const now = new Date().toISOString();

  const query = `
    SELECT ci.id as cart_item_id, ci.*, i.*, p.amount, p.valid_to, p.sale_name
    FROM cart_items ci
    LEFT JOIN items i ON ci.item_id = i.id
    LEFT JOIN (
        SELECT * FROM item_pricing_books ipb
        WHERE ipb.valid_from < ? AND ipb.valid_to > ?
    ) as p ON i.id = p.item_id
    WHERE ci.cart_id = ?
  `;

  return mediator.call('query', formatQuery(query, [now, now, id]));
};
