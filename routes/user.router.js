import express from 'express';
import {
  getAll,
  getById,
  getUserWithPlaylists,
  getByQuery
} from '../controllers/user.controller';

const router = express.Router();

router.get('/', getAll);
router.get('/search', getByQuery);
router.get('/:id', getById);
router.get('/:id/playlists', getUserWithPlaylists);

export default router;
