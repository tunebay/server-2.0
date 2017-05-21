import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const setUserInfo = (req) => {
  const getUserInfo = {
    id: req.id,
    username: req.username,
    email: req.email,
  };

  return getUserInfo;
};

export const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: 604800, // a week in seconds
  });
};

export const comparePassword = (userPassword, databasePassword) => {
  return bcrypt.compareSync(userPassword, databasePassword);
};
