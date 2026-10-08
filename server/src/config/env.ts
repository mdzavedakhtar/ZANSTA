import dotenv from 'dotenv';
import path from 'path';

// Load .env file from root and server directories
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || '5000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || '',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:5000',
  JWT_SECRET: process.env.JWT_SECRET || 'zansta_super_secret_jwt_key_2026_default',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // Superadmin Credentials from .env
  SUPERADMIN_EMAIL: (process.env.SUPERADMIN_EMAIL || '').trim().toLowerCase(),
  SUPERADMIN_PASSWORD: process.env.SUPERADMIN_PASSWORD || '',
  SUPERADMIN_NAME: process.env.SUPERADMIN_NAME || 'Super Admin',

  // Email Service Configuration from .env
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'gmail',
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
  EMAIL_FROM: process.env.EMAIL_FROM || `ZANSTA <${process.env.EMAIL_USER || ''}>`,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || process.env.SUPERADMIN_EMAIL || '',
};
