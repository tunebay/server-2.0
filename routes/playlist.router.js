import express from 'express';
import { requireAuth } from '../config/passport';
import { create } from '../controllers/playlist.controller';

const router = express.Router();

router.post('/', requireAuth, create);

export default router;
