import { ItemData, ItemSpec } from './types';

const reduceItemSpecs = (data: ItemData[]): (ItemData & { specs: ItemSpec[] })[] =>
  data.reduce((acc, item) => {
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

export default reduceItemSpecs;
