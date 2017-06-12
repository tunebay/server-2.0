import { expect } from 'chai';
import Track from '../../models/track.model';

describe('🎵 🚀 Track model', () => {
  describe('.tableName', () => {
    it('it is connect to the tracks tble', () => {
      expect(Track.tableName).to.equal('tracks');
    });
  });

  describe('.jsonSchema', () => {
    const jsonSchema = Track.jsonSchema;

    it('has 6 required fields', () => {
      expect(jsonSchema.required.length).to.equal(7);
    });

    it('it allows for price to be null', () => {
      expect(jsonSchema.properties.price.type).to.include('null');
    });

    it('It has a name property of max length 100', () => {
      expect(jsonSchema.properties.name).to.have.property('maxLength', 100);
    });
  });
});
