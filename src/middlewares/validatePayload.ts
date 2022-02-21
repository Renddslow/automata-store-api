import { Next } from 'polka';
import { ServerResponse, ClientRequest } from 'http';

type Validator = (value: unknown) => boolean;

const validatePayloadMiddleware =
  (attributes: Record<string, boolean | Validator>) =>
  (req: ClientRequest, res: ServerResponse, next: Next) => {};

export default validatePayloadMiddleware;
