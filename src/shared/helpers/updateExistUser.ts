import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes, User } from '../types';
import { usersDB as db } from '../../db/usersDB';

const updateExistUser = (user: User, res: ServerResponse<IncomingMessage>, userId?: string) => {
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

  if (!userId) {
  }

  const userIndex = db.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    res.statusCode = StatusCodes.NOT_FOUND;
    res.end('User not found');
    return;
  }

  const updatedUser = { ...db[userIndex], ...user };
  db[userIndex] = updatedUser;

  const createdUser = db.find((item: User) => item.id === userId);

  return createdUser;
};

export { updateExistUser };
