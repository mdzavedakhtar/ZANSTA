import app from '../src/app.js';
import { connectDB } from '../src/config/db.js';

export default async function handler(req: any, res: any) {
  // Global CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Diagnostics & Health Check Route
  if (req.url === '/' || req.url === '/health' || req.url === '/api' || req.url === '/api/health' || req.url === '/api/v1/health') {
    let dbStatus = 'disconnected';
    try {
      const connected = await connectDB();
      dbStatus = connected ? 'connected' : 'connecting';
    } catch (e: any) {
      dbStatus = `error: ${e.message}`;
    }

    return res.status(200).json({
      status: 'online',
      service: 'ZANSTA Backend Engine Server',
      database: dbStatus,
      mongodbUriConfigured: Boolean(process.env.MONGODB_URI),
      timestamp: new Date().toISOString(),
    });
  }

  // Connect MongoDB
  try {
    await connectDB();
  } catch (err: any) {
    console.error('[ZANSTA Backend] MongoDB connection notice:', err?.message || err);
  }

  // Pass to Express App
  return app(req, res);
}
