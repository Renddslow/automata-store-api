import { ReadHandler } from '../../utils/pipeInbound';
import { CartItemResponse } from '../items/types';
import { list } from '../../models/carts';
import makeCartItemResponse from './makeCartItemResponse';
import catchify from '../../utils/catchify';
import { CartItemData } from './types';

const getCartItems: ReadHandler<CartItemResponse> = async (id: string) => {
  const [err, data] = await catchify<CartItemData[]>(list(id));

  if (err) {
    return {
      errors: [
        {
          code: 'CartNotExistError',
          title: 'Cart does not exist',
          status: 404,
        },
      ],
    };
  }

  return {
    data: data.map(makeCartItemResponse),
  };
};

export default getCartItems;
