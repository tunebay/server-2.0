import bcrypt from 'bcryptjs';
import moment from 'moment';
import User from '../models/user.model';
import reservedUsernames from '../services/reserved_usernames';
import { setUserInfo, generateToken } from '../services/auth';

export const socialAuth = (req, res) => {
  const user = req.user;
  if (user.pending) {
    // unauth user if pending
    req.logout();
    req.session.destroy();
    // foward to finish sign up form here
    return res
      .status(200)
      .json({ isNewUser: true, message: `Sucessfully authenticated with ${user.provider}`, user });
  }
  // called if user is not pending. Changed in register
  return res.status(200).json({ user, isNewUser: false });
};

export const getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(404).json({ error: 'No current user' });
  }
  return res.status(200).json({ user: req.user });
};

export const register = (req, res, next) => {
  req.sanitize('username').trim();
  req.sanitize('email').trim();
  req.sanitize('password').trim();

  req
    .checkBody('username', 'Invalid username')
    .notEmpty()
    .isLength({ min: 3, max: 24 })
    .isUsername();
  req
    .checkBody('email', 'Invalid email address')
    .notEmpty()
    .isLength({ min: 3, max: 255 })
    .isEmail();
  req
    .checkBody('password', 'Invalid password')
    .notEmpty()
    .isLength({ min: 8 });
  req.checkBody('provider', 'Must post provider').notEmpty();
  req
    .checkBody('displayName', 'Invalid display name')
    .notEmpty()
    .isLength({ max: 50 });

  const salt = bcrypt.genSaltSync(10);
  const username = req.body.username;
  const email = req.body.email;
  const provider = req.body.provider;
  const displayName = req.body.displayName;
  const active = true;
  const pending = false;
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
  const createdAt = moment().format();

  const newUser = {
    username,
    email,
    active,
    provider,
    pending,
    password_hash: passwordHash,
    display_name: displayName,
    created_at: createdAt,
  };

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });

    return User.query()
      .insert(newUser)
      .then((user) => {
        const userInfo = setUserInfo(user);
        req.login(userInfo, (err) => {
          if (err) {
            return next(err);
          }
          return res.status(201).json({
            token: generateToken(userInfo),
            user: userInfo,
          });
        });
      })
      .catch((error) => {
        // console.log('CATCH', error);
        res.status(500).json({ error });
      });
  });
};

export const login = (req, res) => {
  req.sanitize('emailOrUsername').trim();
  req.sanitize('password').trim();

  req.checkBody('emailOrUsername', 'Enter a email or username').notEmpty();
  req.checkBody('password', 'Enter a password').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });
    const loginTime = moment().format();

    return User.query()
      .patch({ last_login: loginTime })
      .where('id', req.user.id)
      .first()
      .returning('*')
      .then((user) => {
        const userInfo = setUserInfo(user);
        res.status(201).json({
          token: generateToken(userInfo),
          user: userInfo,
        });
      });
  });
};

export const uniqueUsernameCheck = (req, res) => {
  req.sanitize('username').trim();
  req
    .checkBody('username', 'Invalid username')
    .notEmpty()
    .isLength({ min: 3, max: 24 });

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });
    if (reservedUsernames.includes(req.body.username)) {
      return res.status(200).json({ message: 'Username is reserved.' });
    }

    return User.query()
      .where('username', req.body.username)
      .first()
      .then((user) => {
        return !user
          ? res.status(200).json({ message: 'success' })
          : res.status(200).json({ message: 'Username is not available.' });
      });
  });
};

export const uniqueEmailCheck = (req, res) => {
  req.sanitize('email').trim();
  req
    .checkBody('email', 'Invalid email address')
    .notEmpty()
    .isLength({ min: 3, max: 255 })
    .isEmail();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });

    return User.query()
      .where('email', req.body.email)
      .first()
      .then((user) => {
        return !user
          ? res.status(200).json({ message: 'success' })
          : res.status(200).json({ message: 'Email already in use.' });
      });
  });
};
