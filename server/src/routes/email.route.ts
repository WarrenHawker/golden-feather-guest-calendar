import express from 'express';
import { sendEmailController } from '../controllers/email.controller';

export const router = express.Router();

router.post('/', sendEmailController);
