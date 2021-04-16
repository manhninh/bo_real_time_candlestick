import {pbkdf2Sync, randomBytes} from 'crypto';

const encryptPassword = (password: string, salt: string) =>
  pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

const checkPassword = (password: string, salt: string, hashedPassword: string) => {
  return encryptPassword(password, salt) === hashedPassword;
};

const createHashedSalt = (password: string) => {
  const salt = randomBytes(128).toString('hex');
  const hashedPassword = encryptPassword(password, salt);
  return {hashedPassword, salt};
};

export default {encryptPassword, checkPassword, createHashedSalt};
