import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodes } from '../types';

const handleInternalServerError = (res: ServerResponse<IncomingMessage>, err: unknown) => {
  if (!res.headersSent) {
    res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    res.end(err instanceof Error ? err.message : 'Internal Server Error');
  }
};

export { handleInternalServerError };
