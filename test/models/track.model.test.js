import { expect } from 'chai';
import Track from '../../models/track.model';

describe('🎵 🚀 Track model', () => {
  describe('.tableName', () => {
    it('it is connect to the tracks tble', () => {
      expect(Track.tableName).to.equal('tracks');
    });
  });

  describe('.jsonSchema', () => {
    it('has 6 required fields', () => {
      const jsonSchema = Track.jsonSchema;
      expect(jsonSchema.required.length).to.equal(7);
    });

    it('It has a name property of max length 100', () => {
      const jsonSchema = Track.jsonSchema;
      expect(jsonSchema.properties.name).to.have.property('maxLength', 100);
    });
  });
});
