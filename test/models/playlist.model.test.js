import Playlist from '../../models/playlist.model';

describe('💿 Playlist Model', () => {
  describe('.tableName', () => {
    test('is connected to the playlists table', () => {
      expect(Playlist.tableName).to.equal('playlists');
    });
  });

  describe('.jsonSchema', () => {
    const jsonSchema = Playlist.jsonSchema;

    test('is of type object', () => {
      expect(jsonSchema.type).toEqual('object');
    });

    test('has 9 required feilds', () => {
      expect(jsonSchema.required.length).toEqual(9);
      expect(typeof jsonSchema.required).toBe('array');
      expect(jsonSchema.required).toInclude('user_id');
      expect(jsonSchema.required).toInclude('title');
      expect(jsonSchema.required).toInclude('playlist_type');
      expect(jsonSchema.required).toInclude('price');
      expect(jsonSchema.required).toInclude('number_of_tracks');
      expect(jsonSchema.required).toInclude('duration');
      expect(jsonSchema.required).toInclude('can_pay_more');
      expect(jsonSchema.required).toInclude('permalink');
      expect(jsonSchema.required).toInclude('created_at');
    });

    test('has 13 properties', () => {
      expect(Object.keys(jsonSchema.properties).length).toEqual(13);
    });

    test('has a maximum title length of 100', () => {
      expect(jsonSchema.properties.title).toHaveProperty('maxLength', 100);
    });
  });

  describe('.relationMappings', () => {
    const relationMappings = Playlist.relationMappings;

    test('has a relation to the users table', () => {
      expect(relationMappings).toHaveProperty('user');
    });
  });
});
