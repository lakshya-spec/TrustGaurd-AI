import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { analyzeContentWithAgents } from './server/aiAnalyzer.js';
import {
  getAllInvestigations,
  getInvestigationById,
  saveInvestigation,
  deleteInvestigation,
  resetToSeedData,
  computeStats,
} from './server/storage.js';

dotenv.config();

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://lakshya-spec.github.io');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});
const PORT = 3000;

// Body parsing with adequate size for screenshot base64 payloads
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// 1. Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'TrustGuard AI API',
    version: '1.0.0',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
  });
});

// 2. Analyze Message
app.post('/api/analyze/message', async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    if (!content || typeof content !== 'string' || content.trim() === '') {
      return res.status(400).json({ error: 'Message content cannot be empty.' });
    }
    if (content.length > 5000) {
      return res.status(400).json({ error: 'Message exceeds maximum length of 5000 characters.' });
    }

    const result = await analyzeContentWithAgents(content, 'text');
    saveInvestigation(result);
    return res.json(result);
  } catch (err: any) {
    console.error('Error analyzing message:', err);
    return res.status(500).json({ error: 'Failed to analyze message: ' + (err?.message || 'Internal error') });
  }
});

// 3. Analyze URL
app.post('/api/analyze/url', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return res.status(400).json({ error: 'URL cannot be empty.' });
    }

    const result = await analyzeContentWithAgents(url.trim(), 'url');
    saveInvestigation(result);
    return res.json(result);
  } catch (err: any) {
    console.error('Error analyzing URL:', err);
    return res.status(500).json({ error: 'Failed to analyze URL: ' + (err?.message || 'Internal error') });
  }
});

// 4. Analyze Screenshot
app.post('/api/analyze/screenshot', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', note = '' } = req.body;
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return res.status(400).json({ error: 'Valid screenshot image data (base64) is required.' });
    }

    const contentForAnalysis = note.trim() ? `[Screenshot Analysis] Additional context: ${note}` : 'Suspicious screenshot of message / notification / email';
    const result = await analyzeContentWithAgents(contentForAnalysis, 'screenshot', imageBase64, mimeType);
    saveInvestigation(result);
    return res.json(result);
  } catch (err: any) {
    console.error('Error analyzing screenshot:', err);
    return res.status(500).json({ error: 'Failed to analyze screenshot: ' + (err?.message || 'Internal error') });
  }
});

// 5. Get Investigation History
app.get('/api/investigations', (req: Request, res: Response) => {
  try {
    const history = getAllInvestigations();
    return res.json(history);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to retrieve investigations' });
  }
});

// 6. Get Investigation Detail
app.get('/api/investigations/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = getInvestigationById(id);
    if (!item) {
      return res.status(404).json({ error: 'Investigation not found' });
    }
    return res.json(item);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to retrieve investigation' });
  }
});

// 7. Delete Investigation
app.delete('/api/investigations/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = deleteInvestigation(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Investigation record not found' });
    }
    return res.json({ success: true, message: 'Investigation deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to delete investigation' });
  }
});

// 8. Stats & Threat Intelligence
app.get('/api/stats', (req: Request, res: Response) => {
  try {
    const stats = computeStats();
    return res.json(stats);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to compute stats' });
  }
});

// 9. Reset Demo Data
app.post('/api/investigations/reset-demo', (req: Request, res: Response) => {
  try {
    const records = resetToSeedData();
    return res.json({ success: true, count: records.length, message: 'Reset to standard demo records' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to reset demo data' });
  }
});

// Vite Middleware & SPA serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🛡️ TrustGuard AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal error starting server:', err);
});
