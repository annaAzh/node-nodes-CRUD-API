import { IncomingMessage, ServerResponse } from 'http';
import { usersDB as db } from '../db/usersDB';
import { StatusCodes, User } from '../shared/types';
import { createNewUser, findUserById, handleInternalServerError, notFound } from '../shared/helpers';
import { updateExistUser } from '../shared/helpers/updateExistUser';

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
    handleInternalServerError(res, err);
  }
};

const getUser = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  try {
    const user = findUserById(req, res);
    if (!user) {
      notFound(res, 'User not found');
      return;
    }

    res.statusCode = StatusCodes.OK;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
  } catch (err) {
    handleInternalServerError(res, err);
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

      const createdUser = createNewUser(user, res);

      if (!createdUser) {
        res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
        return;
      }

      res.statusCode = StatusCodes.CREATED;
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify(user));
    });
  } catch (err) {
    handleInternalServerError(res, err);
  }
};

const updateUser = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  try {
    const user = findUserById(req, res);

    if (!user) {
      notFound(res, 'User not found');
      return;
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const newUserInfo: User = JSON.parse(body);

      const createdUser = updateExistUser(newUserInfo, res, user.id);

      if (!createdUser) {
        res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
        return;
      }

      res.statusCode = StatusCodes.OK;
      res.setHeader('Content-type', 'application/json');
      res.end(JSON.stringify(createdUser));
    });
  } catch (err) {
    handleInternalServerError(res, err);
  }
};

const deleteUser = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  try {
    const user = findUserById(req, res);
    db.splice(db.indexOf(user!), 1);

    res.statusCode = StatusCodes.NO_CONTENT;
    res.end();
  } catch (err) {
    handleInternalServerError(res, err);
  }
};

export { getAllUsers, getUser, addUser, updateUser, deleteUser };
