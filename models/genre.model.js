import { Model } from 'objection';

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

//   static get relationMappings() {
//     const Playlist = require('./playlist.model');
//     return {
//       playlist: {
//         relation: Model.ManyToManyRelation,
//         modelClass: Playlist,
//         join: {
//           from: 'genre.id',
//           through: {
//             from: 'playlists_genres.genre_id',
//             to: 'playlists_genres.playlist_id'
//           },
//           to: 'playlist.id'
//         }
//       }
//     };
//   }
}

export default Genre;
