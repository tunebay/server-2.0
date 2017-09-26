import { Model } from 'objection';

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
        'pending'
      ],

      properties: {
        id: { type: 'integer' },
        display_name: { type: 'string', minLength: 1, maxLength: 50 },
        username: { type: 'string', minLength: 3, maxLength: 25 }, // 24 for non-pending
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
        pending: { type: 'boolean' }
      }
    };
  }

  static get relationMappings() {
    return {
      playlists: {
        relation: Model.HasManyRelation,
        modelClass: require('./playlist.model'),
        join: {
          from: 'users.id',
          to: 'playlists.user_id'
        }
      },
      socials: {
        relation: Model.HasManyRelation,
        modelClass: require('./social.model'),
        join: {
          from: 'users.id',
          to: 'socials.user_id'
        }
      }
    };
  }
}

module.exports = User;
