Sure, here's the content for the file: /edu-20bridge-backend/edu-20bridge-backend/src/config/database.ts

import mongoose from 'mongoose';
import { config } from './env';

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;