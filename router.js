import express from 'express';
import UserController from './controllers/user.controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200)
    .json({
      message: 'Tunebay API V1.0 connection ok'
    });
});

router.get('/users', UserController.getAll);

export default router;
