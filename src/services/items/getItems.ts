import { JsonApiBody, JsonApiErrorBody } from '../../types';
import { ReadHandler } from '../../utils/pipeInbound';

const getItems: ReadHandler = (
  _: null,
  query: Record<string, string>,
  user,
  page,
): JsonApiBody<any> | JsonApiErrorBody => {
  console.log(page);
  return {
    data: [
      {
        type: 'item',
        attributes: {},
      },
    ],
  };
};

export default getItems;
