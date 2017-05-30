import { expect } from 'chai';
import Genre from '../../models/genre.model';

describe('‍🎻 🚀 Genre Model', () => {
  describe('.tableName', () => {
    it('is connected to the genres table', () => {
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

  describe('.relationMappings', () => {
    const relationMappings = Genre.relationMappings;

    it('has a many to many relation to the genre table', () => {
      expect(relationMappings).to.have.property('playlist');
    });
  });
});
