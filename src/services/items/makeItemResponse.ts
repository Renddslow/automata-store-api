import slugify from 'slugify';

import { Item, ItemData, ItemSpec } from './types';
import { JsonApiData } from '../../types';

const makeItemResponse = (item: ItemData & { specs: ItemSpec[] }): JsonApiData<Item> => ({
  type: 'item',
  id: item.id,
  attributes: {
    name: item.name,
    slug: slugify(item.name, {
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true,
      replacement: '-',
    }),
    manufacturer: item.manufacturer,
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
});

export default makeItemResponse;
