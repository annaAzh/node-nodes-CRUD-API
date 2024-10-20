import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes } from '../types';

const notFound = (res: ServerResponse<IncomingMessage>, message: string) => {
  res.statusCode = StatusCodes.NOT_FOUND;
  res.setHeader('Content-Type', 'text/plain');
  res.end(message);
};

export { notFound };
