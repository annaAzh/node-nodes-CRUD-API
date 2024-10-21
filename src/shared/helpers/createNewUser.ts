import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes, User } from '../types';
import { usersDB as db } from '../../db/usersDB';
import { generateUUID } from './useUUID';

const createNewUser = (user: User, res: ServerResponse<IncomingMessage>) => {
  if (
    !user.username ||
    !user.age ||
    !user.hobbies ||
    typeof user.age !== 'number' ||
    !Array.isArray(user.hobbies) ||
    typeof user.username !== 'string'
  ) {
    res.statusCode = StatusCodes.BAD_REQUEST;
    res.end('Invalid user data');
    return;
  }

  const id = generateUUID();
  if (!id) {
    res.statusCode = StatusCodes.BAD_REQUEST;
    res.end('Invalid UUID generated');
    return;
  }

  user.id = id;
  db.push(user);

  const createdUser = db.find((item: User) => item.id === user.id);

  return createdUser;
};

export { createNewUser };
