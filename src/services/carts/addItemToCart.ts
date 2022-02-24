import { MutationHandler } from '../../utils/pipeInbound';
import { upsertCartItem } from '../../models/carts';
import { JsonApiData } from '../../types';
import catchify from '../../utils/catchify';
import { CartItemData } from './types';
import { CartItemResponse } from '../items/types';
import makeItemResponse from '../items/makeItemResponse';
import makeCartItemResponse from './makeCartItemResponse';

type CartItemPayload = {
  itemId: number;
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

  return {
    data: makeCartItemResponse(data[0]),
  };
};

export default addItemToCart;
