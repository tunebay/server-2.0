import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200)
    .json({
      message: 'Tunebay API V1.0 connection ok'
    });
});

export default router;
