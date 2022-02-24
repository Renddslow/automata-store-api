import polka from 'polka';
import { mutate } from '../utils/pipeInbound';
import { createPaymentIntent } from '../services/orders';

const orders = polka()
  .post('/')
  .post('/intent', mutate(createPaymentIntent))
  .get('/:id')
  .patch('/:id');

export default orders;
