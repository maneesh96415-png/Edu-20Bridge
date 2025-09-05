Sure, here's the content for the file: /edu-20bridge-backend/edu-20bridge-backend/src/config/env.ts

import dotenv from 'dotenv';

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
};

export default env;