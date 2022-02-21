export type ApiError = {
  code: string;
  status: number;
  title: string;
  detail: string;
};

export type JsonApiBody<Attr> = {
  data: {
    type: string;
    id?: string | number;
    attributes: Attr;
  };
  included?: Record<string, any>[];
  meta?: Record<string, any>;
};

type Validator = (value: unknown) => boolean;

export type ValidatorSchema = {
  [k: string]: boolean | Validator;
};

export type TokenUser = {
  cartID: string;
  customerID?: string;
  firstName?: string;
};
