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

// Robots.txt Handler
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`# ZANSTA Web Crawler Directives
User-agent: *
Allow: /
Allow: /about
Allow: /services
Allow: /projects
Allow: /projects/*
Allow: /team
Allow: /contact
Allow: /login

# Disallow Private Admin, Workspaces & Internal API
Disallow: /dashboard
Disallow: /admin/
Disallow: /admin/*
Disallow: /agency/
Disallow: /client/
Disallow: /demo/
Disallow: /invite/
Disallow: /settings
Disallow: /notifications
Disallow: /api/
Disallow: /api/*

Host: https://zansta.dev
Sitemap: https://zansta.dev/sitemap.xml
`);
});

// Dynamic Sitemap.xml Handler
app.get('/sitemap.xml', async (req, res) => {
  try {
    const { CMSProject } = await import('./models/CMSProject.js');
    const projects = await CMSProject.find({ isVisible: true }).lean().catch(() => []);
    
    const now = new Date().toISOString();
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Core Static Pages -->
  <url>
    <loc>https://zansta.dev/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://zansta.dev/services</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://zansta.dev/projects</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://zansta.dev/team</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://zansta.dev/about</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://zansta.dev/contact</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://zansta.dev/login</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;

    if (Array.isArray(projects) && projects.length > 0) {
      for (const p of projects) {
        if (p.slug) {
          const projectMod = p.updatedAt ? new Date(p.updatedAt).toISOString() : now;
          xml += `  <url>
    <loc>https://zansta.dev/projects/${p.slug}</loc>
    <lastmod>${projectMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
        }
      }
    } else {
      // Fallback default case studies if DB empty
      const defaultSlugs = ['caresprint', 'neurostack', 'insightiq'];
      for (const s of defaultSlugs) {
        xml += `  <url>
    <loc>https://zansta.dev/projects/${s}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      }
    }

    xml += `</urlset>`;

    res.type('application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).send('Error generating sitemap');
  }
});

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

