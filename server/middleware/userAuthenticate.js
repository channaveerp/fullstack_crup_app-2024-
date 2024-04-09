import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '');
    console.log('tokne', token);
    const decodeed = jwt.verify(token, 'secret key');
    const user = await User.findById(decodeed);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    console.log('erorr', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
