// require('dotenv').config({ path: './env' });
// import dotenv from 'dotenv';
// dotenv.config({
//   path: './.env',
// });
// dotenv.config();
import {} from 'dotenv/config.js';

import connectDB from './db/db.js';
import { app } from './app.js';


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('MONGO db connection failed !!! ', err);
  });
