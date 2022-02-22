import { JsonApiBody, JsonApiErrorBody } from '../../types';
import { ReadHandler } from '../../utils/pipeInbound';
import { list } from '../../models/items';
import catchify from '../../utils/catchify';

const getItems: ReadHandler = async (
  _: null,
  query: Record<string, string>,
  user,
  page,
): Promise<JsonApiBody<any> | JsonApiErrorBody> => {
  const cursor = page || {
    limit: 24,
    cursor: 0,
    direction: 'next',
  };

  const [err, data] = await catchify(list(cursor));

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
