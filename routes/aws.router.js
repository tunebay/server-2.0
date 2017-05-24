import express from 'express';
import { sign } from '../controllers/aws.controller';

const router = express.Router();

router.get('/s3/sign', sign);

export default router;
