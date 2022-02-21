import polka from 'polka';
import { read } from '../utils/pipeInbound';

const customers = polka()
  .get(
    '/',
    read(() => ({ errors: [] })),
  )
  .post('/')
  .get(
    '/:id',
    read(() => ({ errors: [] })),
  );

export default customers;
