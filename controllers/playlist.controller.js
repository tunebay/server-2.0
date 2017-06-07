import decamelize from 'decamelize-keys-deep';
import camelCaseKeys from 'camelcase-keys';
import Playlist from '../models/playlist.model';

export const create = (req, res) => {
  req.sanitize('title').trim();
  req.sanitize('purchaseMesssage').trim();
  req.checkBody('title', 'Invalid title').notEmpty().isLength({ max: 100 });
  req.checkBody('purchaseMesssage', 'Invalid password').isLength({ max: 255 });

  const newPlaylist = decamelize(req.body);

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });

    return Playlist
      .query()
      .insertGraph(newPlaylist)
      .then((playlistInfo) => {
        const playlist = camelCaseKeys(playlistInfo, { deep: true });
        return res.status(201).json(playlist);
      })
      .catch(error => res.status(500).json({ error }));
  });
};
