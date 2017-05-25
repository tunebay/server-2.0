import express from 'express';

import userRoutes from './user.router';
import authRoutes from './auth.router';
import awsRoutes from './aws.router';
import playlistRoutes from './playlist.router';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200)
    .json({
      message: 'Tunebay API V1.0 connection ok'
    });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/aws', awsRoutes);
router.use('/playlists', playlistRoutes);

export default router;
