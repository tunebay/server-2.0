import { Model } from 'objection';
import Playlist from './playlist.model';

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'display_name',
        'username',
        'email',
        'active',
        'created_at',
        'password_hash',
        'provider',
      ],

      properties: {
        id: { type: 'integer' },
        display_name: { type: 'string', minLength: 1, maxLength: 50 },
        username: { type: 'string', minLength: 3, maxLength: 24 },
        email: { type: 'string', minLength: 3, maxLength: 255 },
        active: { type: 'boolean' },
        provider: { type: 'string' },
        first_name: { type: ['string', 'null'] },
        last_name: { type: ['string', 'null'] },
        account_type: { type: ['string', 'null'] },
        profile_image: { type: ['string', 'null'] },
        gender: { type: ['string', 'null'] },
        cover_photo: { type: ['string', 'null'] },
        verified: { type: ['boolean', 'null'] },
        last_login: { type: ['string', 'null'], format: 'date-time' },
        created_at: { type: 'string', format: 'date-time' },
        password_hash: { type: 'string', minLength: 8, maxLength: 100 },
      },
    };
  }

  static get relationMappings() {
    return {
      playlists: {
        relation: Model.HasManyRelation,
        modelClass: Playlist,
        join: {
          from: 'users.id',
          to: 'playlists.user_id',
        },
      },
    };
  }
}

export default User;
