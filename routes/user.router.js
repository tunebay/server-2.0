import express from 'express';
import {
  getAll,
  getById,
  getUserPlaylists,
  getByQuery
} from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/search', getByQuery);
router.get('/:id', getById);
router.get('/:id/playlists', getUserPlaylists);

export default router;
