import express from 'express';
import passport from 'passport';
import { requireLogin } from '../services/passport';
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

// Google

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get('/google/callback', passport.authenticate('google'));

// Facebook

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email', 'user_actions.music'],
  }),
);

router.get('/facebook/callback', passport.authenticate('facebook'));

export default router;
