import express from 'express';
import passport from 'passport';
import { register, login } from '../controllers/auth.controller';
import '../config/passport';

const router = express.Router();

// const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.post('/register', register);
router.post('/login', requireLogin, login);

export default router;
