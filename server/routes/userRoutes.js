// routes/userRoutes.js
import {
  deleteUser,
  editUsers,
  getAlluserData,
  login,
  userRegister,
} from '../controllers/userControllers.js';
import express from 'express';
import { authenticateUser } from '../middleware/userAuthenticate.js';

const router = express.Router();

router.post('/user/register', userRegister);
router.post('/user/login', login);
router.get('/user/getAllusers', authenticateUser, getAlluserData);
router.delete('/user/delete-user', deleteUser);
router.patch('/user/edit-user/', editUsers);

export default router;
