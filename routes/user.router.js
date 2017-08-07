import express from 'express';
import {
  getAll,
  getByUsername,
  getUserPlaylists,
  getByQuery,
  getById,
} from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/search', getByQuery);
router.get('/id/:id', getById);
router.get('/:username', getByUsername);
router.get('/:username/playlists', getUserPlaylists);

export default router;
