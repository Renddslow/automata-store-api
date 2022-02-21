import { ApiError, JsonApiBody, TokenUser } from '../types';

export type ReadHandler = <T>(
  id: string | null,
  query: Record<string, string>,
  user: TokenUser,
) => JsonApiBody<T> | { errors: ApiError[] };

export type MutationHandler = <ReqAttr, ResAttr>(
  id: string | null,
  body: JsonApiBody<ReqAttr>,
  query: Record<string, string>,
  user: TokenUser,
) => JsonApiBody<ResAttr> | { errors: ApiError[] };

export const read = (handler: ReadHandler) => (req, res) => {
  const response = handler(req.params?.id, req.query, { cartID: '' });
  return res.json(response, 'errors' in response ? 400 : 200);
};

export const mutate = (handler: MutationHandler) => (req, res) => {
  const response = handler(req.params?.id, req.body, req.query, { cartID: '' });
  return res.json(response, 'errors' in response ? 400 : 200);
};

// An alias of read for better readability
export const destroy = read;
