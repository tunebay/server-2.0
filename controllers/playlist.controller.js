import Playlist from '../models/playlist.model';
import { formatForSQLInsert, formatSQLResponse } from '../lib/helpers';

export const create = (req, res) => {
  req.sanitize('title').trim();
  req.sanitize('purchaseMesssage').trim();

  req.checkBody('title', 'Invalid title').notEmpty().isLength({ max: 100 });
  req.checkBody('purchaseMesssage', 'Invalid password').isLength({ max: 255 });

  const newPlaylist = formatForSQLInsert(req.body);

  Playlist
    .query()
    .insert(newPlaylist)
    .then((playlist) => {
      const playlistInfo = formatSQLResponse(playlist);
      res.status(201).json({ playlist: playlistInfo });
    })
    .catch(error => res.status(500).json({ error }));
};
