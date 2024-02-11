// app.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes.js';

const app = express();
dotenv.config();
app.use(express.json());

const port = process.env.PORT || 5000;
app.use('/api', userRoute);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  try {
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  } catch (err) {
    console.log('err', err);
  }
});
