import express from 'express';
import { requireAuth } from '../services/passport';
import { create, getById } from '../controllers/playlist.controller';

const router = express.Router();

router.post('/', requireAuth, create);
router.get('/:id', getById);

export default router;
