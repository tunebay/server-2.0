import { Model } from 'objection';
import Playlist from './playlist.model';

class Track extends Model {
  static get tableName() {
    return 'tracks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'playlist_id',
        'name',
        'duration',
        'playlist_position',
        'sigle',
        'file_type',
        'location'
      ],

      properties: {
        id: { type: 'integer' },
        playlist_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 100 },
        duration: { type: 'integer' },
        price: { type: 'number', minimum: 0.00, maximum: 999.99 },
        playlist_position: { type: 'integer' },
        location: { type: 'string' },
        single: { type: 'boolean' },
        file_type: { type: 'string' }
      },
    };
  }

  static get relationMappings() {
    return {
      playlist: {
        relation: Model.BelongsToOneRelation,
        modelClass: Playlist,
        join: {
          from: 'tracks.playlist_id',
          to: 'playlists.id'
        }
      }
    };
  }
}

export default Track;
