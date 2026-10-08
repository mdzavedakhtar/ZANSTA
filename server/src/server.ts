import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import { verifyEmailService } from './services/email.service.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initSockets } from './sockets/index.js';

const app = express();
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

// Security & Utility Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow any origin so phones and network devices can connect
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API Routes
app.use('/api/v1', apiRouter);

// Global Error Handler
app.use(errorHandler);

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

