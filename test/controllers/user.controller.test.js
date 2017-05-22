import { expect } from 'chai';
import UserController from '../../controllers/user.controller';

xdescribe('👨🏼‍💻 User 🎮 Controller', () => {
  describe('#getAll', () => {
    const request = {};
    const response = { status: () => 200, json: obj => obj };

    it('gets all users', (done) => {
      const users = UserController.getAll(request, response);
      console.log(users);
      done();
    });
  });
});
