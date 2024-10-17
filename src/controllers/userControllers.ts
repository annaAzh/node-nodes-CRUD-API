import { IncomingMessage, ServerResponse } from 'http';
import { usersDB as db } from '../db/usersDB';
import { generateUUID, isValidedUUID } from '../shared/helpers/useUUID';
import { StatusCodes, User } from '../shared/types';

const getAllUsers = (_req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  try {
    const users = db;
    if (!users) {
      throw new Error('Users are not found');
    }
    res.statusCode = StatusCodes.OK;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(users));
  } catch (err) {
    if (err instanceof Error) {
      res.statusCode = StatusCodes.NOT_FOUND;
      res.end(err.message);
    } else {
      res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      res.end('Internal Server Error');
    }
  }
};

const getUser = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  try {
    if (req.url === undefined) {
      res.statusCode = StatusCodes.BAD_REQUEST;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Uncorrect url');
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const userId = url?.pathname?.match(/\/api\/users\/([^]+)/)?.[1];

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
    if (!user) {
      res.statusCode = StatusCodes.NOT_FOUND;
      res.setHeader('Content-Type', 'text/plain');
      res.end('User not found');
      return;
    }

    res.statusCode = StatusCodes.OK;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
  } catch (err) {
    if (err instanceof Error) {
      res.statusCode = StatusCodes.NOT_FOUND;
      res.end(err.message);
    } else {
      res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      res.end('Internal Server Error');
    }
  }
};

const addUser = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const user: User = JSON.parse(body);

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
      if (!createdUser) {
        res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        res.end('Internal Server Error');
        return;
      }

      res.statusCode = StatusCodes.CREATED;
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify(user));
    });
  } catch (err) {
    if (err instanceof Error) {
      res.statusCode = StatusCodes.NOT_FOUND;
      res.end(err.message);
    } else {
      res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      res.end('Internal Server Error');
    }
  }
};

const updateUser = (_req: IncomingMessage, _res: ServerResponse<IncomingMessage>) => {
  console.log('user put', _req, _res);
};

const deleteUser = (_req: IncomingMessage, _res: ServerResponse<IncomingMessage>) => {
  console.log('user delete', _req, _res);
};

export { getAllUsers, getUser, addUser, updateUser, deleteUser };
