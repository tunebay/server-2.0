import { Model } from 'objection';

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
        price: { type: 'number', minimum: 0.0, maximum: 999.99 },
        number_of_tracks: { type: 'integer' },
        duration: { type: 'integer' },
        can_pay_more: { type: 'boolean' },
        permalink: { type: 'string' },
        artwork: { type: ['string', 'null'] },
        purchase_message: { type: ['string', 'null'], maxLength: 255 },
        release_date: { type: ['string', 'null'], format: 'date-time' },
        created_at: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get namedFilters() {
    return {
      orderByCreatedAt: (builder) => {
        builder.orderBy('created_at', 'DESC');
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: require('./user.model'),
        join: {
          from: 'playlists.user_id',
          to: 'users.id',
        },
      },
      tracks: {
        relation: Model.HasManyRelation,
        modelClass: require('./track.model'),
        join: {
          from: 'playlists.id',
          to: 'tracks.playlist_id',
        },
      },
      genres: {
        relation: Model.ManyToManyRelation,
        modelClass: require('./genre.model'),
        join: {
          from: 'playlists.id',
          through: {
            modelClass: require('./playlist_genre.model'),
            from: 'playlists_genres.playlist_id',
            to: 'playlists_genres.genre_id',
          },
          to: 'genres.id',
        },
      },
    };
  }
}

module.exports = Playlist;
