import mongoose from 'mongoose';
import { ENV } from './env.js';
import { seedCMSData } from './seed.js';

export const connectDB = async (): Promise<boolean> => {
  const uri = ENV.MONGODB_URI || '';

  if (!uri || uri.includes('<db_username>') || uri.includes('<username>')) {
    console.log('\n┌────────────────────────────────────────────────────────────┐');
    console.log('│  ⚠️  MONGODB CONFIGURATION NOTICE                          │');
    console.log('├────────────────────────────────────────────────────────────┤');
    console.log('│  MongoDB Atlas URI in server/.env has placeholder:         │');
    console.log('│  "<db_username>" is not yet replaced with your username.   │');
    console.log('│                                                            │');
    console.log('│  👉 In server/.env, change:                                │');
    console.log('│  MONGODB_URI=mongodb+srv://<db_username>:password@...      │');
    console.log('│  TO:                                                       │');
    console.log('│  MONGODB_URI=mongodb+srv://YOUR_USERNAME:password@...      │');
    console.log('└────────────────────────────────────────────────────────────┘\n');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      dbName: 'zansta',
      serverSelectionTimeoutMS: 5000,
    });

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║  ✅ MONGODB CONNECTED SUCCESSFULLY!                        ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log(`║  📦 Database : ${conn.connection.name || 'zansta'}`.padEnd(61) + '║');
    console.log(`║  🌐 Host     : ${conn.connection.host}`.padEnd(61) + '║');
    console.log('║  🚀 Superadmin CMS is now LIVE and storing to MongoDB!     ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    // Seed initial CMS dataset if collections are empty
    await seedCMSData();
    return true;
  } catch (error: any) {
    console.log('\n┌────────────────────────────────────────────────────────────┐');
    console.log('│  ❌ MONGODB CONNECTION FAILED                              │');
    console.log('├────────────────────────────────────────────────────────────┤');
    console.log(`│  Error: ${error.message}`.slice(0, 60).padEnd(61) + '│');
    console.log('│  Please verify your MongoDB Atlas username & password.     │');
    console.log('└────────────────────────────────────────────────────────────┘\n');
    return false;
  }
};

