import { generateZavedResumePdfBase64 } from '../utils/generateZavedResume.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  const resumeUrl = generateZavedResumePdfBase64();
  console.log('Generated Resume URL Length:', resumeUrl.length);

  await mongoose.connect(process.env.MONGODB_URI!);
  const col = mongoose.connection.db!.collection('cmsteammembers');
  const result = await col.updateOne(
    { id: 'team_zaved' },
    { $set: { resumeUrl: resumeUrl, resumeFileName: 'MD_Zaved_Akhtar_Resume.pdf' } }
  );
  console.log('MongoDB update result:', result);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
