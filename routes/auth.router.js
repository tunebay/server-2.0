import express from 'express';
import passport from 'passport';
import {
  register,
  login,
  uniqueUsernameCheck,
  uniqueEmailCheck,
} from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', passport.authenticate('local'), login);
router.post('/usernamecheck', uniqueUsernameCheck);
router.post('/emailcheck', uniqueEmailCheck);

router.get('/test', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send({ user: req.user, session: req.session });
  } else {
    req.session.views = 1;
    res.send({ user: req.user, session: req.session });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send({ message: 'logged out' });
});

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
