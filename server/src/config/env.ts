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
  MONGODB_URI:
    process.env.MONGODB_URI ||
    'mongodb+srv://mdzavedakhtar62_db_user:j7JuazXZvCKWbIrc@cluster0.zxjie2z.mongodb.net/zansta?retryWrites=true&w=majority',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:5000',
  JWT_SECRET: process.env.JWT_SECRET || 'zansta_super_secret_jwt_key_2026_change_in_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // Superadmin Credentials from .env
  SUPERADMIN_EMAIL: (process.env.SUPERADMIN_EMAIL || 'zanstacom@gmail.com').trim().toLowerCase(),
  SUPERADMIN_PASSWORD: process.env.SUPERADMIN_PASSWORD || 'Zansta@SuperAdmin2026!',
  SUPERADMIN_NAME: process.env.SUPERADMIN_NAME || 'MD Zaved Akhtar',

  // Email Service Configuration from .env
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'gmail',
  EMAIL_USER: process.env.EMAIL_USER || 'zanstacom@gmail.com',
  EMAIL_PASS: process.env.EMAIL_PASS || 'wcdbeqrmcheheowg',
  EMAIL_FROM: process.env.EMAIL_FROM || 'ZANSTA <zanstacom@gmail.com>',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'zanstacom@gmail.com',
};
