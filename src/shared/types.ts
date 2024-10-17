export enum Paths {
  USERS = '/api/users',
}

export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export enum StatusCodes {
  'OK' = 200,
  'CREATED' = 201,
  'NO_CONTENT' = 204,
  'BAD_REQUEST' = 400,
  'NOT_FOUND' = 404,
  'INTERNAL_SERVER_ERROR' = 500,
}
