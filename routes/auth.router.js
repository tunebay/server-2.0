import express from 'express';
import passport from 'passport';
import { requireLogin } from '../config/passport';
import {
  register,
  login,
  uniqueUsernameCheck,
  uniqueEmailCheck,
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', requireLogin, login);
router.post('/usernamecheck', uniqueUsernameCheck);
router.post('/emailcheck', uniqueEmailCheck);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get('/google/callback', passport.authenticate('google'));

export default router;
