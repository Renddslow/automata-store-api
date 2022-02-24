import { MutationHandler } from '../../utils/pipeInbound';
import { ModifiedResultSet } from './types';
import { create } from '../../models/carts';
import catchify from '../../utils/catchify';

const createCart: MutationHandler<{}, {}> = async (_: null, body) => {
  const [err, data] = await catchify<ModifiedResultSet>(create());

  if (err) {
    return {
      errors: [
        {
          code: 'CartNoCreateError',
          title: 'Cart could not be created',
          status: 500,
        },
      ],
    };
  }

  return {
    data: {
      id: data.generatedId,
      type: 'cart',
      attributes: {},
    },
  };
};

export default createCart;
