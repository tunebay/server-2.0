import { Model } from 'objection';
import User from './user.model';

class Social extends Model {
  static get tableName() {
    return 'socials';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'social_id', 'provider'],
      properties: {
        user_id: { type: 'integer' },
        social_id: { type: 'string' },
        provider: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'socials.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

export default Social;
