import { v4, validate } from 'uuid';

const generateUUID = () => {
  return v4();
};

const isValidedUUID = (uuidValue: string) => {
  return validate(uuidValue);
};

export { isValidedUUID, generateUUID };
