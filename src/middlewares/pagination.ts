import { Next } from 'polka';
import qs, { ParsedQs } from 'qs';

import { Cursor } from '../types';

const pagination = (req, res, next: Next) => {
  const { page, limit } = qs.parse(req.search, {
    interpretNumericEntities: true,
    ignoreQueryPrefix: true,
  });

  const p: Partial<Cursor> = {
    limit: limit ? parseInt(limit as string, 10) : 24,
    direction: 'next',
  };

  if (page && (page as ParsedQs).cursor) {
    const cursorStr = Buffer.from((page as ParsedQs).cursor as string, 'base64').toString();
    const [direction, cursor] = cursorStr.split('__');
    const cursorAsNumber = parseInt(cursor, 10);
    p.cursor = !Number.isNaN(cursorAsNumber) ? cursorAsNumber : cursor;
    p.direction = direction === 'prev' ? 'prev' : 'next';
  }

  if (page) {
    req.page = p;
  }

  next();
};

export default pagination;
