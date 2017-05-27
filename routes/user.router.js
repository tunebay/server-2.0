import express from 'express';
import { getAll, getByUsername } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/:username', getByUsername);

export default router;
