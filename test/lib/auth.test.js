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

    test('sets the user info', () => {
      expect(userInfo).toHaveProperty('email');
      expect(userInfo).toHaveProperty('id');
      expect(userInfo).toHaveProperty('displayName');
      expect(userInfo).toHaveProperty('username');
      expect(userInfo).not.toHaveProperty('passwordHash');
      expect(userInfo).not.toHaveProperty('password_hash');
      expect(userInfo).not.toHaveProperty('password');
    });
  });

  describe('generateToken()', () => {
    test('generates a JWT token for the given user', () => {
      const userInfo = setUserInfo(newUser);
      expect(typeof generateToken(userInfo)).toBe('string');
    });
  });
});
