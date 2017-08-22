import { Model } from 'objection';

class PlaylistGenre extends Model {
  static get tableName() {
    return 'playlists_genres';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['playlist_id', 'genre_id'],
      properties: {
        playlist_id: { type: 'integer' },
        genre_id: { type: 'integer' },
      },
    };
  }
}

module.exports = PlaylistGenre;
