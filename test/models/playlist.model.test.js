import { expect } from 'chai';
import Playlist from '../../models/playlist.model';

describe('💿 🚀 Playlist Model', () => {
  describe('.tableName', () => {
    it('is connected to the playlists table', () => {
      expect(Playlist.tableName).to.equal('playlists');
    });
  });

  describe('.jsonSchema', () => {
    const jsonSchema = Playlist.jsonSchema;

    it('is of type object', () => {
      expect(jsonSchema.type).to.equal('object');
    });

    it('has 9 required feilds', () => {
      expect(jsonSchema.required.length).to.equal(9);
      expect(jsonSchema.required).to.be.an('array');
      expect(jsonSchema.required).to.include('user_id');
      expect(jsonSchema.required).to.include('title');
      expect(jsonSchema.required).to.include('playlist_type');
      expect(jsonSchema.required).to.include('price');
      expect(jsonSchema.required).to.include('number_of_tracks');
      expect(jsonSchema.required).to.include('duration');
      expect(jsonSchema.required).to.include('can_pay_more');
      expect(jsonSchema.required).to.include('permalink');
      expect(jsonSchema.required).to.include('created_at');
    });

    it('has 13 properties', () => {
      expect(Object.keys(jsonSchema.properties).length).to.equal(13);
    });

    it('has a maximum title length of 100', () => {
      expect(jsonSchema.properties.title).to.have.property('maxLength', 100);
    });

    it('it allows certain properties to be null', () => {
      expect(jsonSchema.properties.artwork.type).to.include('null');
      expect(jsonSchema.properties.release_date.type).to.include('null');
      expect(jsonSchema.properties.artwork.type).to.include('null');
    });
  });

  describe('.relationMappings', () => {
    const relationMappings = Playlist.relationMappings;

    it('has a relation to the users table', () => {
      expect(relationMappings).to.have.property('user');
    });

    it('has a relation to the tracks table', () => {
      expect(relationMappings).to.have.property('tracks');
    });

    it('has a many to many relation to the genre table', () => {
      expect(relationMappings).to.have.property('genres');
    });
  });

  describe('.namedFilters', () => {
    const namedFilters = Playlist.namedFilters;

    it('has a function that orders by created at', () => {
      expect(namedFilters).to.have.property('orderByCreatedAt');
    });
  });
});
