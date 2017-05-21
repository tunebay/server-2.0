import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';

export const setUserInfo = (req) => {
  const getUserInfo = {
    id: req.id,
    username: req.username,
    email: req.email,
  };

  return getUserInfo;
};

export const generateToken = (user) => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, config.jwtSecret, {
    expiresIn: 604800, // a week in seconds
  });
};

export const getUserIdFromToken = (token) => {
  const payload = jwt.verify(token, config.jwtSecret);
  return payload.sub;
};

export const comparePassword = (userPassword, databasePassword) => {
  return bcrypt.compareSync(userPassword, databasePassword);
};
