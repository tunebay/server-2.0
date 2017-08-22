import express from 'express';
import passport from 'passport';
import {
  register,
  login,
  uniqueUsernameCheck,
  uniqueEmailCheck,
  socialAuth,
  getCurrentUser,
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', passport.authenticate('local'), login);
router.post('/usernamecheck', uniqueUsernameCheck);
router.post('/emailcheck', uniqueEmailCheck);
router.get('/current_user', getCurrentUser);

router.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.send({ message: 'logged out' });
});

// Google

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get('/google/callback', passport.authenticate('google'), socialAuth);

// Facebook

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email', 'user_actions.music'],
  }),
);

router.get('/facebook/callback', passport.authenticate('facebook'), socialAuth);

export default router;
