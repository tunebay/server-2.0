import User from '../models/user.model';

const getAll = (req, res) => {
  User
    .query()
    .orderBy('id')
    .then(users => res.status(200).json(users))
    .catch(error => res.status(500).json({ error }));
};

export default { getAll };
