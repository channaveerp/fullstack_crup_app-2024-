import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const receivedToken = authorizationHeader.replace('Bearer ', ''); // Remove 'Bearer ' prefix
    console.log('Received token:', receivedToken); // Log the received token for debugging

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      return res.status(500).json({ message: 'JWT secret key is not set' });
    }

    // Verify the received token
    const decoded = jwt.verify(receivedToken, secretKey);
    console.log('Decoded token:', decoded); // Log the decoded token for debugging

    // Query the user by email
    const user = await User.findOne({ email: decoded.email });
    console.log('user', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log('Token verification failed:', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
