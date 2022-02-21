import { Next } from 'polka';

import { JsonApiBody, ValidatorSchema } from '../types';
import payloadIsValid from '../utils/payloadIsValid';

const validatePayloadMiddleware = (schema: ValidatorSchema) => (req, res, next: Next) => {
  const payload: JsonApiBody<unknown> = req.body;

  const validity = payloadIsValid(payload, schema);

  if (!validity.isValid) {
    return res.json(
      {
        errors: validity.errors,
      },
      400,
    );
  }

  next();
};

export default validatePayloadMiddleware;
