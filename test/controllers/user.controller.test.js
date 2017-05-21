import { expect } from 'chai';
import UserController from '../../controllers/user.controller';

xdescribe('👨🏼‍💻 User 🎮 Controller', () => {
  describe('#getAll', () => {
    it('gets all users', (done) => {
      // need to mock req/res somehow
      expect(UserController.getAll()).to.be.an('array');
      done();
    });
  });
});
