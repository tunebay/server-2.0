import { Model } from 'objection';

class User extends Model {
  static tableName() {
    return 'users';
  }

  static jsonSchema() {
    return {
      type: 'object',
      required: [
        'display_name',
        'username',
        'email',
        'active',
        'created_at',
        'password_hash'
      ],

      properties: {
        id: { type: 'integer' },
        display_name: { type: 'string', minLength: 1, maxLength: 50 },
        username: { type: 'string', minLength: 3, maxLength: 24 },
        email: { type: 'string', minLength: 6, maxLength: 255 },
        active: { type: 'boolean' },
        account_type: { type: ['string', 'null'] },
        last_login: { type: ['string', 'null'], format: 'date-time' },
        created_at: { type: 'string', format: 'date-time' },
        password_hash: { type: 'string', minLength: 8, maxLength: 100 }
      },
    };
  }
}

export default User;
