import { JsonApiBody, JsonApiErrorBody } from '../../types';
import { ReadHandler } from '../../utils/pipeInbound';
import { list } from '../../models/items';
import catchify from '../../utils/catchify';
import { Item, ItemData } from './types';
import reduceItemSpecs from './reduceItemSpecs';
import makeItemResponse from './makeItemResponse';

const getItems: ReadHandler<Item> = async (
  _: null,
  query: Record<string, string>,
  user,
  page,
): Promise<JsonApiBody<Item> | JsonApiErrorBody> => {
  const cursor = page || {
    limit: 24,
    cursor: 0,
    direction: 'next',
  };

  const [err, itemData] = await catchify<ItemData[]>(list(cursor));

  if (err) {
    return {
      errors: [
        {
          code: 'TableNoExistError',
          detail: 'Table "items" does not exist',
          title: 'Missing Table',
          status: 500,
        },
      ],
    };
  }

  const itemsWithSpecs = reduceItemSpecs(itemData);

  return {
    data: itemsWithSpecs.map(makeItemResponse),
  };
};

export default getItems;
