import { expect } from 'chai';
import User from '../../models/user.model';

describe('👨🏼‍💻 🚀 User Model', () => {
  describe('.tableName', () => {
    it('is connected to the users table', () => {
      expect(User.tableName).to.equal('users');
    });
  });

  describe('.jsonSchema', () => {
    const jsonSchema = User.jsonSchema;

    it('is of type object', () => {
      expect(jsonSchema.type).to.equal('object');
    });

    it('has 8 required feilds', () => {
      expect(jsonSchema.required).to.be.an('array');
      expect(jsonSchema.required.length).to.equal(8);
      expect(jsonSchema.required).to.include('display_name');
      expect(jsonSchema.required).to.include('email');
      expect(jsonSchema.required).to.include('password_hash');
      expect(jsonSchema.required).to.include('username');
      expect(jsonSchema.required).to.include('active');
      expect(jsonSchema.required).to.include('created_at');
    });

    it('has 17 properties', () => {
      expect(Object.keys(jsonSchema.properties).length).to.equal(17);
    });
  });
});
