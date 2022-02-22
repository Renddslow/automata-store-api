import { ApiError, Cursor, JsonApiBody, TokenUser } from '../types';

type ApiResponse<T> = JsonApiBody<T> | { errors: ApiError[] };

export type ReadHandler = <T>(
  id: string | null,
  query: Record<string, string>,
  user: TokenUser,
  page: Cursor,
) => ApiResponse<T> | Promise<ApiResponse<T>>;

export type MutationHandler = <ReqAttr, ResAttr>(
  id: string | null,
  body: JsonApiBody<ReqAttr>,
  query: Record<string, string>,
  user: TokenUser,
) => ApiResponse<ResAttr> | Promise<ApiResponse<ResAttr>>;

const getStatus = (response: ApiResponse<unknown>) => {
  if ('errors' in response) {
    if (response.errors.length) {
      return response.errors[0].status;
    }
    return 400;
  }

  return 200;
};

export const read = (handler: ReadHandler) => async (req, res) => {
  const response = await Promise.resolve(
    handler(req.params?.id || null, req.query, req.user, req.page),
  );
  return res.json(response, getStatus(response));
};

export const mutate = (handler: MutationHandler) => async (req, res) => {
  const response = await Promise.resolve(
    handler(req.params?.id || null, req.body, req.query, req.user),
  );
  return res.json(response, getStatus(response));
};

// An alias of read for better readability
export const destroy = read;
