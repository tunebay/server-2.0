import express from 'express';
import { create } from '../controllers/playlist.controller';

const router = express.Router();

router.post('/', create);

export default router;
