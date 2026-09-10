import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB = async (): Promise<boolean> => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB] Connection Notice: Local database server not available yet (${(error as Error).message}). App running in decoupled state.`);
    return false;
  }
};
