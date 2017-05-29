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
}

export default Genre;
