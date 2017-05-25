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
    const userInfo = setUserInfo(newUser);

    it('sets the user info', () => {
      expect(userInfo).to.have.property('email');
      expect(userInfo).to.have.property('id');
      expect(userInfo).to.have.property('displayName');
      expect(userInfo).to.have.property('username');
      expect(userInfo).not.to.have.property('passwordHash');
      expect(userInfo).not.to.have.property('password_hash');
      expect(userInfo).not.to.have.property('password');
    });
  });

  describe('generateToken()', () => {
    it('generates a JWT token for the given user', () => {
      const userInfo = setUserInfo(newUser);
      expect(generateToken(userInfo)).to.be.a('string');
    });
  });
});
