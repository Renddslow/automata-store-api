import Stripe from 'stripe';
import { MutationHandler } from '../../utils/pipeInbound';
import { JsonApiData } from '../../types';

// @ts-ignore
const stripe = new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

type Payload = {
  amount: number;
};

type Response = {
  clientSecret: string;
};

const createPaymentIntent: MutationHandler<Payload, Response> = async (_: null, body) => {
  const { amount } = (body.data as JsonApiData<Payload>).attributes;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    data: {
      type: 'payment_intent',
      attributes: {
        clientSecret: paymentIntent.client_secret,
      },
    },
  };
};

export default createPaymentIntent;
