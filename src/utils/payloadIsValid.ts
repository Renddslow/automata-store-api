import { ApiError, JsonApiBody, ValidatorSchema } from '../types';

type Response = {
  isValid: boolean;
  errors: ApiError[];
};

const createError = (detail: string) => ({
  status: 400,
  code: 'AttributesError',
  title: 'Missing attribute or invalid value',
  detail,
});

const payloadIsValid = <T>(payload: JsonApiBody<T>, schema: ValidatorSchema): Response => {
  const { attributes } = payload.data;

  const errors = Object.keys(schema).reduce((acc, k) => {
    const v = schema[k];
    const validator = typeof v === 'function' ? v : (val) => !!val === v;

    if (!validator(attributes[k])) {
      acc.push(
        createError(
          `Required attribute "${k}" was not supplied or had an invalid value at data.attributes.${k}`,
        ),
      );
    }

    return acc;
  }, []);

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default payloadIsValid;
