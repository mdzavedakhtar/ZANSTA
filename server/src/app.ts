import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRouter from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectDB } from './config/db.js';

const app = express();

// Ensure DB is connected for serverless invocations
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('Database connection error in request:', err);
  }
  next();
});

// Security & Utility Middlewares
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow any origin for maximum compatibility
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));

// Root Status & Health Check Handler
app.get('/', (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    success: true,
    name: 'ZANSTA Backend Engine API',
    status: 'ONLINE',
    version: '1.0.0',
    database: isConnected ? 'CONNECTED (MongoDB Atlas)' : 'CONNECTING',
    endpoints: {
      health: '/api/v1/health',
      team: '/api/v1/cms/team',
      services: '/api/v1/cms/services',
      projects: '/api/v1/cms/projects',
      reviews: '/api/v1/cms/reviews',
      landing: '/api/v1/cms/landing',
    },
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting' });
});

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
app.use('/api', apiRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
