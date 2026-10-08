import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app.js';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { verifyEmailService } from './services/email.service.js';
import { initSockets } from './sockets/index.js';

const httpServer = createServer(app);

// Socket.IO Setup
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

initSockets(io);

// Start Server
const PORT = Number(ENV.PORT) || 5000;

connectDB().then(async () => {
  await verifyEmailService();
  httpServer.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`  ZANSTA Engine Server Running on Port ${PORT}`);
    console.log(`  Environment: ${ENV.NODE_ENV}`);
    console.log(`  API Base: http://localhost:${PORT}/api/v1`);
    console.log(`  Health Check: http://localhost:${PORT}/api/v1/health`);
    console.log(`==================================================\n`);
  });
});

export { app, httpServer, io };
