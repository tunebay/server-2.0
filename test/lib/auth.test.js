import { expect } from 'chai';
import { generateToken, setUserInfo } from '../../lib/auth';

describe('🔑 Auth', () => {
  const newUser = {
    id: 1,
    display_name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe'
  };

  describe('setUserInfo()', () => {
    it('sets the user info', () => {
      expect(setUserInfo(newUser)).to.have.property('email');
      expect(setUserInfo(newUser)).to.have.property('id');
      expect(setUserInfo(newUser)).to.have.property('displayName');
      expect(setUserInfo(newUser)).to.have.property('username');
      expect(setUserInfo(newUser)).not.to.have.property('passwordHash');
      expect(setUserInfo(newUser)).not.to.have.property('password_hash');
      expect(setUserInfo(newUser)).not.to.have.property('password');
    });
  });

  describe('generateToken()', () => {
    it('generates a JWT token for the given user', () => {
      const userInfo = setUserInfo(newUser);
      expect(generateToken(userInfo)).to.be.a('string');
    });
  });
});
