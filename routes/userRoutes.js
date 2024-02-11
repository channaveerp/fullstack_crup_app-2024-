// routes/userRoutes.js
import { login, userRegister } from '../controllers/userControllers.js';
import express from 'express';

const router = express.Router();

router.post('/user/register', userRegister);
router.get('/user/login', login);

export default router;
