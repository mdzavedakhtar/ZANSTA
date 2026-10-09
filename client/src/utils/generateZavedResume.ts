/**
 * Generates a valid, complete, professional PDF document for MD Zaved Akhtar
 * compliant with PDF 1.4 specification without external dependencies.
 */

export function generateZavedResumePdfBase64(): string {
  const lines = [
    'BT',
    '/F1 22 Tf',
    '0.545 0.051 0.102 rg',
    '40 790 Td',
    '(MD ZAVED AKHTAR) Tj',
    'ET',

    'BT',
    '/F2 11 Tf',
    '0.15 0.15 0.15 rg',
    '40 770 Td',
    '(Full-Stack, Generative AI & Data Analytics Engineer | Bhilai, CG, India) Tj',
    'ET',

    'BT',
    '/F2 9 Tf',
    '0.3 0.3 0.3 rg',
    '40 752 Td',
    '(Email: mdzavedakhtar62@gmail.com | Phone: +91 6202888431 | LinkedIn: /in/md-zaved-akhtar-22013828b) Tj',
    'ET',

    // Accent line
    '0.545 0.051 0.102 RG',
    '2 w',
    '40 740 m 555 740 l S',

    // PROFESSIONAL SUMMARY
    'BT',
    '/F1 12 Tf',
    '0.545 0.051 0.102 rg',
    '40 718 Td',
    '(PROFESSIONAL SUMMARY) Tj',
    'ET',

    'BT',
    '/F2 9.5 Tf',
    '0.15 0.15 0.15 rg',
    '40 700 Td',
    '(Results-driven Full-Stack & AI Engineer with 3+ years experience architecting high-performance) Tj',
    '0 -13 Td',
    '(developer workspaces, RAG document intelligence platforms, and scalable Next.js / MERN cloud) Tj',
    '0 -13 Td',
    '(systems. Proficient in Python, SQL, Power BI data analytics, Vector DBs, and modern web architectures.) Tj',
    'ET',

    // CORE TECHNICAL EXPERTISE
    'BT',
    '/F1 12 Tf',
    '0.545 0.051 0.102 rg',
    '40 655 Td',
    '(CORE TECHNICAL EXPERTISE) Tj',
    'ET',

    'BT',
    '/F1 9.5 Tf',
    '0.1 0.1 0.1 rg',
    '40 637 Td',
    '(Full-Stack Web:) Tj',
    '/F2 9.5 Tf',
    '80 0 Td',
    '(React 18, Next.js, Node.js, Express, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS) Tj',
    'ET',

    'BT',
    '/F1 9.5 Tf',
    '0.1 0.1 0.1 rg',
    '40 622 Td',
    '(AI & ML Eng:) Tj',
    '/F2 9.5 Tf',
    '80 0 Td',
    '(Generative AI, RAG Architectures, LangChain, Pinecone, Neo4j, OpenAI & Gemini APIs) Tj',
    'ET',

    'BT',
    '/F1 9.5 Tf',
    '0.1 0.1 0.1 rg',
    '40 607 Td',
    '(Data & Cloud:) Tj',
    '/F2 9.5 Tf',
    '80 0 Td',
    '(Python, SQL, MongoDB Atlas, PostgreSQL, Power BI, DAX, Pandas, Redis, Docker, Azure AI) Tj',
    'ET',

    // FEATURED PROJECTS
    'BT',
    '/F1 12 Tf',
    '0.545 0.051 0.102 rg',
    '40 575 Td',
    '(FEATURED PRODUCTION PROJECTS) Tj',
    'ET',

    'BT',
    '/F1 10 Tf',
    '0.1 0.1 0.1 rg',
    '40 557 Td',
    '(1. ZANSTA Platform - Next-Gen Developer Workspace & Agency Engine) Tj',
    'ET',

    'BT',
    '/F2 9 Tf',
    '0.25 0.25 0.25 rg',
    '40 542 Td',
    '(- Engineered multi-tenant workspace with real-time Socket.IO sync, CMS CRUD, and live lead pipeline.) Tj',
    '0 -12 Td',
    '(- Implemented MongoDB compound indexing, sub-50ms latency, and cyber-aesthetic Framer UI.) Tj',
    'ET',

    'BT',
    '/F1 10 Tf',
    '0.1 0.1 0.1 rg',
    '40 508 Td',
    '(2. CareSprint AI - Telehealth & RAG Medical Consultation Portal) Tj',
    'ET',

    'BT',
    '/F2 9 Tf',
    '0.25 0.25 0.25 rg',
    '40 493 Td',
    '(- Architected WebRTC video consultation mesh with sub-100ms signaling latency.) Tj',
    '0 -12 Td',
    '(- Implemented HIPAA-compliant AES-256 encrypted medical records and AI document summary engine.) Tj',
    'ET',

    'BT',
    '/F1 10 Tf',
    '0.1 0.1 0.1 rg',
    '40 459 Td',
    '(3. NeuroStack RAG - Enterprise Document Intelligence Platform) Tj',
    'ET',

    'BT',
    '/F2 9 Tf',
    '0.25 0.25 0.25 rg',
    '40 444 Td',
    '(- Built multi-modal PDF parsing and vector search pipeline using Pinecone and Neo4j graph DB.) Tj',
    '0 -12 Td',
    '(- Reduced query synthesis response time by 60% with context caching and streaming tokens.) Tj',
    'ET',

    // CERTIFICATIONS
    'BT',
    '/F1 12 Tf',
    '0.545 0.051 0.102 rg',
    '40 410 Td',
    '(CERTIFICATIONS & GOVERNMENT RECOGNITIONS) Tj',
    'ET',

    'BT',
    '/F2 9.5 Tf',
    '0.15 0.15 0.15 rg',
    '40 392 Td',
    '(- Microsoft Certified: Azure AI Fundamentals (AI-900)) Tj',
    '0 -14 Td',
    '(- Ministry of MSME Govt. of India: Registered Enterprise (UDYAM-CG-02-0018924)) Tj',
    '0 -14 Td',
    '(- MSME Certified: Advanced Data Analytics & Full-Stack Application Specialist) Tj',
    'ET',

    // EDUCATION
    'BT',
    '/F1 12 Tf',
    '0.545 0.051 0.102 rg',
    '40 338 Td',
    '(EDUCATION & ACADEMICS) Tj',
    'ET',

    'BT',
    '/F1 10 Tf',
    '0.1 0.1 0.1 rg',
    '40 320 Td',
    '(Bachelor of Technology in Computer Science & Engineering) Tj',
    'ET',

    'BT',
    '/F2 9 Tf',
    '0.3 0.3 0.3 rg',
    '40 305 Td',
    '(CSVTU University, Bhilai, Chhattisgarh | Focus: Distributed Systems, AI, Cloud Computing) Tj',
    'ET',

    // Footer
    '0.8 0.8 0.8 RG',
    '0.5 w',
    '40 50 m 555 50 l S',
    'BT',
    '/F2 8 Tf',
    '0.5 0.5 0.5 rg',
    '40 38 Td',
    '(ZANSTA Official Verified Engineering Collective Resume | MD Zaved Akhtar) Tj',
    'ET'
  ];

  const streamContent = lines.join('\n');
  const encoder = new TextEncoder();
  const streamLength = encoder.encode(streamContent).length;

  const objects: string[] = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj',
    `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj`,
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj',
    '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj',
  ];

  let body = '%PDF-1.4\n';
  const offsets: number[] = [];

  for (let i = 0; i < objects.length; i++) {
    offsets.push(encoder.encode(body).length);
    body += objects[i] + '\n';
  }

  const startxref = encoder.encode(body).length;
  body += 'xref\n0 7\n0000000000 65535 f \n';
  for (let i = 0; i < offsets.length; i++) {
    body += offsets[i].toString().padStart(10, '0') + ' 00000 n \n';
  }
  body += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  const bytes = encoder.encode(body);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return `data:application/pdf;base64,${base64}`;
}
