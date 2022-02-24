export type ApiError = {
  code: string;
  status: number;
  title: string;
  detail?: string;
};

export type JsonApiData<Attr> = {
  type: string;
  id?: string | number;
  attributes: Attr;
};

export type JsonApiBody<Attr> = {
  data: JsonApiData<Attr> | JsonApiData<Attr>[];
  included?: Record<string, any>[];
  meta?: Record<string, any>;
};

export type JsonApiErrorBody = {
  errors: ApiError[];
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

export type Cursor = {
  cursor: string | number;
  direction: 'next' | 'prev';
  limit: number;
};
