import { JsonApiBody, JsonApiErrorBody } from '../../types';
import { ReadHandler } from '../../utils/pipeInbound';
import { list } from '../../models/items';
import catchify from '../../utils/catchify';
import { Item, ItemData } from './types';

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

  const itemsWithSpecs = itemData.reduce((acc, item) => {
    const itemIdx = acc.findIndex((i) => i.id === item.id);
    if (itemIdx > -1) {
      acc[itemIdx].specs.push({
        label: item.label,
        value: item.value,
      });
    } else {
      const { label, value, ...rest } = item;
      acc.push({
        ...rest,
        specs: [{ label, value }],
      });
    }
    return acc;
  }, []);

  return {
    data: itemsWithSpecs.map((item) => ({
      type: 'item',
      id: item.id,
      attributes: {
        name: item.name,
        originalPrice: item.msrp,
        pricing: item.amount && {
          amount: item.amount,
          validTo: item.valid_to,
          saleName: item.sale_name,
        },
        description: item.description.toString(),
        warranty: item.warranty.toString(),
        overview: item.overview.toString(),
        image: item.image,
        specs: item.specs,
      },
    })),
  };
};

export default getItems;
