import express from 'express';
import passport from 'passport';
import '../config/passport';
import {
  register,
  login,
  uniqueUsernameCheck,
  uniqueEmailCheck
} from '../controllers/auth.controller';

const router = express.Router();

// const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.post('/register', register);
router.post('/login', requireLogin, login);
router.post('/usernamecheck', uniqueUsernameCheck);
router.post('/emailcheck', uniqueEmailCheck);

export default router;
