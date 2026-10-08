import app from '../server/src/app.js';
import { connectDB } from '../server/src/config/db.js';

export default async function handler(req: any, res: any) {
  // CORS preflight support
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

  // Quick Diagnostics & Health Check route
  if (req.url === '/api' || req.url === '/api/' || req.url === '/api/health' || req.url === '/api/v1/health') {
    let dbStatus = 'disconnected';
    try {
      const connected = await connectDB();
      dbStatus = connected ? 'connected' : 'connecting';
    } catch (e: any) {
      dbStatus = `error: ${e.message}`;
    }

    return res.status(200).json({
      status: 'online',
      message: 'ZANSTA Serverless Engine Running Successfully on Vercel',
      database: dbStatus,
      mongodbUriConfigured: Boolean(process.env.MONGODB_URI),
      timestamp: new Date().toISOString(),
    });
  }

  // Connect to DB before passing to Express
  try {
    await connectDB();
  } catch (err: any) {
    console.error('[Vercel API Gateway] MongoDB Connection Notice:', err?.message || err);
  }

  // Pass request to Express Application
  return app(req, res);
}
