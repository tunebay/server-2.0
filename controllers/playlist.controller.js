import Playlist from '../models/playlist.model';

export const create = (req, res) => {
  Playlist
    .query()
    .insert(req.body)
    .then(playlist => res.status(200).json(playlist))
    .catch(error => res.status(500).json({ error }));
};
