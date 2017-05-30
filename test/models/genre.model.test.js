import { expect } from 'chai';
import Genre from '../../models/genre.model';

describe('‍🎻 🚀 Genre Model', () => {
  describe('.tableName', () => {
    it('is connected to the users table', () => {
      expect(Genre.tableName).to.equal('genres');
    });
  });

  describe('.jsonSchema', () => {
    const jsonSchema = Genre.jsonSchema;

    it('is of type object', () => {
      expect(jsonSchema.type).to.equal('object');
    });

    it('name is required', () => {
      expect(jsonSchema.required[0]).to.equal('name');
    });

    it('has 2 properties', () => {
      expect(Object.keys(jsonSchema.properties).length).to.equal(2);
    });
  });
});
