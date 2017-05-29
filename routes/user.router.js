import express from 'express';
import {
  getAll,
  getByUsername,
  getUserWithPlaylists,
  getByQuery
} from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/search', getByQuery)
router.get('/:username', getByUsername);
router.get('/:username/playlists', getUserWithPlaylists);

export default router;
