import express from 'express';
import requireAuth from '../services/middlewares/require_auth';
import { create, getById } from '../controllers/playlist.controller';

const router = express.Router();

router.post('/', create);
router.get('/:id', getById);

export default router;
