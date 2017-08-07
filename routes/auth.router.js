import express from 'express';
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

export default router;
