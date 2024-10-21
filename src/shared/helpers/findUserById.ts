import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes, User } from '../types';
import { isValidedUUID } from './useUUID';
import { usersDB as db } from '../../db/usersDB';

const findUserById = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  if (req.url === undefined) {
    res.statusCode = StatusCodes.BAD_REQUEST;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Uncorrect url');
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const userId = url?.pathname?.match(/\/api\/users\/([^\/]+)/)?.[1];

  if (userId) {
    const isValided = isValidedUUID(userId);

    if (!isValided) {
      res.statusCode = StatusCodes.BAD_REQUEST;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not valid uuid');
      return;
    }
  }

  const user = db.find((user: User) => user.id === userId);

  return user;
};

export { findUserById };
