import { MutationHandler } from '../../utils/pipeInbound';
import { upsertCartItem } from '../../models/carts';
import { JsonApiData } from '../../types';
import catchify from '../../utils/catchify';
import { CartItemData } from './types';
import { Item } from '../items/types';
import makeItemResponse from '../items/makeItemResponse';

type CartItemPayload = {
  itemId: number;
};

type CartItemResponse = Omit<Item, 'specs'> & {
  itemId: number;
  priceOnAdd: number;
  quantity: number;
};

const addItemToCart: MutationHandler<CartItemPayload, CartItemResponse> = async (
  id: string,
  body,
) => {
  const itemID = (body.data as JsonApiData<CartItemPayload>).attributes.itemId;
  const [err, data] = await catchify<CartItemData>(upsertCartItem(id, itemID));

  if (err) {
    return {
      errors: [
        {
          code: 'UpsertError',
          title: 'Trouble upserting item into cart',
          details: `Item with id "${itemID}" could not be upserted into cart with id "${id}"`,
          status: 400,
        },
      ],
    };
  }

  const responseData = data[0];

  const itemAttributes = makeItemResponse({ ...responseData, specs: [] });
  const { specs, ...item } = itemAttributes.attributes;

  return {
    data: {
      type: 'cart_item',
      id: responseData.cart_item_id,
      attributes: {
        itemId: responseData.item_id,
        priceOnAdd: responseData.price_on_add,
        quantity: responseData.quantity,
        ...item,
      },
    },
  };
};

export default addItemToCart;
