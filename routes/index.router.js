import express from 'express';
import userRoutes from './user.router';
import authRoutes from './auth.router';
import awsRoutes from './aws.router';

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

export default router;
