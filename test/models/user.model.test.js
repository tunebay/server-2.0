import User from '../../models/user.model';

describe('👨🏼‍💻 User Model', () => {
  describe('.tableName', () => {
    test('is connected to the users table', () => {
      expect(User.tableName).toEqual('users');
    });
  });

  describe('.jsonSchema', () => {
    const jsonSchema = User.jsonSchema;

    test('is of type object', () => {
      expect(jsonSchema.type).to.equal('object');
    });

    test('has 6 required feilds', () => {
      expect(typeof jsonSchema.required).toBe('array');
      expect(jsonSchema.required.length).toEqual(6);
      expect(jsonSchema.required).toInclude('display_name');
      expect(jsonSchema.required).toInclude('email');
      expect(jsonSchema.required).toInclude('password_hash');
      expect(jsonSchema.required).toInclude('username');
      expect(jsonSchema.required).toInclude('active');
      expect(jsonSchema.required).toInclude('created_at');
    });

    test('has 9 properties', () => {
      expect(Object.keys(jsonSchema.properties).length).toEqual(9);
    });
  });
});
