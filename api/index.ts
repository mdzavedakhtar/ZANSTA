import app from '../server/src/app.js';
import { connectDB } from '../server/src/config/db.js';

export default async function handler(req: any, res: any) {
  try {
    await connectDB();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
  return app(req, res);
}
