import camelCase from 'camelcase-keys';
import User from '../models/user.model';
import { setUserInfo } from '../services/auth';

export const getAll = (req, res) => {
  User.query()
    .orderBy('id')
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({ error }));
};

export const getByUsername = (req, res) => {
  User.query()
    .where('username', req.params.username)
    .first()
    .then(user => {
      if (!user) return res.status(404).json({ error: 'user not found.' });
      const userInfo = setUserInfo(user);
      return res.status(200).json({ user: userInfo });
    })
    .catch(error => res.status(500).json({ error }));
};

export const getById = (req, res) => {
  User.query()
    .where('id', req.params.id)
    .first()
    .then(user => {
      if (!user) return res.status(404).json({ error: 'user not found.' });
      const userInfo = setUserInfo(user);
      return res.status(200).json({ user: userInfo });
    })
    .catch(error => res.status(500).json({ error }));
};

export const getUserPlaylists = (req, res) => {
  console.log('REQ USER HERE', req.user);
  User.query()
    .where('username', req.params.username)
    .first()
    .eager('playlists(orderByCreatedAt).[tracks, genres, user]')
    .then(user => {
      if (!user) return res.status(404).json({ error: 'user not found.' });
      const userInfo = camelCase(user, { deep: true });
      return res.status(200).json({ user: userInfo });
    })
    .catch(error => res.status(500).json({ error }));
};

export const getByQuery = (req, res) => {
  req.checkQuery('email').isEmail();
  req
    .checkQuery('username', 'Invalid username.')
    .isLength({ min: 3, max: 24 })
    .isUsername();

  const validQueryParameters = ['username', 'email', 'id'];
  const isValidQuery = Object.keys(req.query).every(e =>
    validQueryParameters.includes(e)
  );

  if (!isValidQuery) {
    return res
      .status(400)
      .json({ error: 'One or more query parameters are invalid.' });
  }

  return User.query()
    .where(req.query)
    .first()
    .then(user => {
      if (!user) return res.status(404).json({ error: 'user not found.' });
      const userInfo = setUserInfo(user);
      return res.status(200).json({ user: userInfo });
    });
};
