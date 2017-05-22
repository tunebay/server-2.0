import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { setUserInfo, generateToken } from '../lib/auth';

export const register = (req, res) => {
  req.sanitize('username').trim();
  req.sanitize('email').trim();
  req.sanitize('password').trim();

  req.checkBody('username', 'Invalid username').notEmpty().isLength({ min: 3, max: 24 });
  req.checkBody('email', 'Invalid email address').notEmpty().isLength({ min: 6, max: 255 }).isEmail();
  req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 8 });
  req.checkBody('displayName', 'Invalid display name').notEmpty().isLength({ min: 8, max: 50 });

  const salt = bcrypt.genSaltSync(10);
  const username = req.body.username;
  const email = req.body.email;
  const displayName = req.body.displayName;
  const active = true;
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
  const createdAt = Date.now();

  const newUser = {
    username,
    email,
    active,
    password_hash: passwordHash,
    display_name: displayName,
    created_at: createdAt
  };

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });

    return User
      .query()
      .insert(newUser)
      .then((user) => {
        const userInfo = setUserInfo(user);
        res.status(201).json({
          token: `JWT ${generateToken(userInfo)}`,
          user: userInfo,
        });
      })
      .catch(error => res.status(500).json({ error }));
  });
};

export const login = (req, res) => {
  req.sanitize('username').trim();
  req.sanitize('password').trim();

  req.checkBody('username', 'Enter a username').notEmpty();
  req.checkBody('password', 'Enter a password').notEmpty();

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });

    const userInfo = setUserInfo(req.user);
    return res.status(200).json({
      token: `JWT ${generateToken(userInfo)}`,
      user: userInfo,
    });
  });
};
