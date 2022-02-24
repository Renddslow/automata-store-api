import { ReadHandler } from '../../utils/pipeInbound';
import { Item, ItemData } from './types';
import { JsonApiBody, JsonApiErrorBody } from '../../types';
import catchify from '../../utils/catchify';
import { read } from '../../models/items';
import reduceItemSpecs from './reduceItemSpecs';
import makeItemResponse from './makeItemResponse';

const getItems: ReadHandler<Item> = async (
  id: string,
): Promise<JsonApiBody<Item> | JsonApiErrorBody> => {
  const [err, itemData] = await catchify<ItemData[]>(read(parseInt(id, 10)));

  if (err || !itemData.length) {
    return {
      errors: [
        {
          code: 'ProductNoExistError',
          detail: `A product with id "${id}" does not exist`,
          title: 'Product Not Found',
          status: 404,
        },
      ],
    };
  }

  return {
    data: makeItemResponse(reduceItemSpecs(itemData)[0]),
  };
};

export default getItems;
