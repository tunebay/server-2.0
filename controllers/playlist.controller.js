import underscoreKeys from 'decamelize-keys-deep';
import camelCaseKeys from 'camelcase-keys';
import Playlist from '../models/playlist.model';
import knex from '../db/knex';

export const create = (req, res) => {
  req.sanitize('title').trim();
  req.sanitize('purchaseMesssage').trim();
  req.checkBody('title', 'Invalid title').notEmpty().isLength({ max: 100 });
  req.checkBody('purchaseMesssage', 'Invalid password').isLength({ max: 255 });

  const genreIds = req.body.genreIds;
  const newPlaylist = underscoreKeys(req.body);
  delete newPlaylist.genre_ids;

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });

    return Playlist
      .query()
      .insertGraph(newPlaylist)
      .then((playlistInfo) => {
        const genresToInsert = genreIds.map((genreId) => {
          return { playlist_id: playlistInfo.id, genre_id: genreId };
        });
        return knex('playlists_genres')
          .returning('genre_id')
          .insert(genresToInsert)
          .then((genres) => {
            const playlist = { ...camelCaseKeys(playlistInfo), genreIds: genres };
            res.status(201).json({ playlist });
          });
      })
      .catch(error => res.status(500).json({ error }));
  });
};
