import User from '../models/user.model';
import { setUserInfo } from '../lib/auth';

export const getAll = (req, res) => {
  User
    .query()
    .orderBy('id')
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({ error }));
};

export const getByUsername = (req, res) => {
  User
    .query()
    .where('username', req.params.username)
    .first()
    .then((user) => {
      if (!user) return res.status(404).json({ error: 'user not found.' });
      const userInfo = setUserInfo(user);
      return res.status(200).json({ user: userInfo });
    })
    .catch(error => res.status(500).json({ error }));
};
