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
    description: item.description ? item.description.toString() : undefined,
    warranty: item.warranty ? item.warranty.toString() : undefined,
    overview: item.overview ? item.overview.toString() : undefined,
    image: item.image,
    specs: item.specs.filter(({ label }) => !!label),
  },
});

export default makeItemResponse;
