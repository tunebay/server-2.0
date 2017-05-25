import { Model } from 'objection';
import User from './user.model';

class Playlist extends Model {
  static get tableName() {
    return 'playlists';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'user_id',
        'title',
        'playlist_type',
        'price',
        'number_of_tracks',
        'duration',
        'can_pay_more',
        'permalink',
        'created_at',
      ],

      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 100 },
        playlist_type: { type: 'string', maxLength: 24 },
        price: { type: 'float', minimum: 0.00, maximum: 999.99 },
        number_of_tracks: { type: 'integer' },
        duration: { type: 'integer' },
        can_pay_more: { type: 'boolean' },
        permalink: { type: 'string' },
        artwork: { type: 'string' },
        purchase_message: { type: 'string', maxLength: 255 },
        release_date: { type: 'string', format: 'date-time' },
        created_at: { type: 'string', format: 'date-time' }
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'playlists.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

export default Playlist;
