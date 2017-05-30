import Playlist from '../models/playlist.model';
import Genre from '../models/genre.model';
import knex from '../db/knex';
import { formatForSQLInsert, formatSQLResponse } from '../lib/helpers';

export const create = (req, res) => {
  req.sanitize('title').trim();
  req.sanitize('purchaseMesssage').trim();

  req.checkBody('title', 'Invalid title').notEmpty().isLength({ max: 100 });
  req.checkBody('genreIds', 'Genre ids must be supplied').notEmpty();
  req.checkBody('purchaseMesssage', 'Invalid password').isLength({ max: 255 });

  const genreIds = req.body.genreIds;
  const newPlaylist = formatForSQLInsert(req.body);
  delete newPlaylist.genre_ids;

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) return res.status(400).json({ errors: result.mapped() });

    return Playlist
      .query()
      .insert(newPlaylist)
      .then((playlist) => {
        const playlistInfo = formatSQLResponse(playlist);

        const playlistGenreRows = genreIds.map((genreId) => {
          return { playlist_id: playlist.id, genre_id: genreId };
        });

        knex('playlists_genres').insert(playlistGenreRows)
          .then(() => {
            Genre
              .query()
              .select('name')
              .whereIn('id', genreIds)
              .then((genres) => {
                const genreArray = genres.map((genre) => {
                  return genre.name;
                });
                res.status(201).json({ playlist: { ...playlistInfo, genres: genreArray } });
              });
          });
      })
      .catch(error => res.status(500).json({ error }));
  });
};
