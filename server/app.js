// app.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoute from './routes/userRoutes.js';
import { authenticateUser } from './middleware/userAuthenticate.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
app.use('/api', authenticateUser, userRoute);
console.log('MongoDB URL:', process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  try {
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  } catch (err) {
    console.log('err', err);
  }
});
