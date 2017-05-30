import { expect } from 'chai';
import PlaylistGenre from '../../models/playlist_genre.model';

describe('‍💿 🎻 🚀 Genre Model', () => {
  describe('.tableName', () => {
    it('is connected to the playlists_genres table', () => {
      expect(PlaylistGenre.tableName).to.equal('playlists_genres');
    });
  });

  describe('.jsonSchema', () => {
    const jsonSchema = PlaylistGenre.jsonSchema;

    it('is of type object', () => {
      expect(jsonSchema.type).to.equal('object');
    });

    it('has 2 required properties', () => {
      expect(jsonSchema.required.length).to.equal(2);
    });

    it('has 2 properties', () => {
      expect(Object.keys(jsonSchema.properties).length).to.equal(2);
    });
  });
});
