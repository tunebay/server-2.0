import { Model } from 'objection';
import Playlist from './playlist.model';
import PlaylistGenre from './playlist_genre.model';

class Genre extends Model {
  static get tableName() {
    return 'genres';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 50 },
      },
    };
  }

  static get relationMappings() {
    // const Playlist = require('./playlist.model');
    return {
      playlists: {
        relation: Model.ManyToManyRelation,
        modelClass: Playlist,
        join: {
          from: 'genres.id',
          through: {
            modelClass: PlaylistGenre,
            from: 'playlists_genres.genre_id',
            to: 'playlists_genres.playlist_id'
          },
          to: 'playlists.id'
        }
      }
    };
  }
}

export default Genre;
