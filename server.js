/**
 * HIT Tracker — Express Proxy Server
 *
 * Proxies all /api/* requests to the real Haskell backend at localhost:8080
 * Serves static frontend from /public
 *
 * Start backend first:
 *   cd <HIT-repo-clone> && docker-compose up
 *
 * Then start this server:
 *   node server.js
 */

const express = require('express');
const path = require('path');
const http = require('http');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;
const HASKELL_BACKEND = process.env.HIT_BACKEND_URL || 'http://localhost:8080';

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));

// CORS — Allow frontend to call API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.status(200).end();
    next();
});

// ─── Static Frontend ──────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ─── Health Proxy ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
    proxyRequest(req, res, '/health');
});

// ─── Auth Proxy ───────────────────────────────────────────────────────────────
app.post('/auth/login', (req, res) => proxyRequest(req, res, '/auth/login'));
app.post('/auth/signup', (req, res) => proxyRequest(req, res, '/auth/signup'));

// ─── Habits Proxy ─────────────────────────────────────────────────────────────
app.get('/habits', (req, res) => {
    const qs = req.query.interval ? `?interval=${req.query.interval}` : '';
    proxyRequest(req, res, '/habits' + qs);
});

app.get('/habits/daily', (req, res) => proxyRequest(req, res, '/habits/daily'));
app.post('/habits/daily', (req, res) => proxyRequest(req, res, '/habits/daily'));
app.get('/habits/daily/:id', (req, res) => proxyRequest(req, res, '/habits/daily/' + req.params.id));
app.put('/habits/daily/:id', (req, res) => proxyRequest(req, res, '/habits/daily/' + req.params.id));
app.delete('/habits/daily/:id', (req, res) => proxyRequest(req, res, '/habits/daily/' + req.params.id));

app.get('/habits/weekly', (req, res) => proxyRequest(req, res, '/habits/weekly'));
app.post('/habits/weekly', (req, res) => proxyRequest(req, res, '/habits/weekly'));
app.get('/habits/weekly/:id', (req, res) => proxyRequest(req, res, '/habits/weekly/' + req.params.id));
app.put('/habits/weekly/:id', (req, res) => proxyRequest(req, res, '/habits/weekly/' + req.params.id));
app.delete('/habits/weekly/:id', (req, res) => proxyRequest(req, res, '/habits/weekly/' + req.params.id));

// ─── Goals Proxy ─────────────────────────────────────────────────────────────
app.get('/goals', (req, res) => proxyRequest(req, res, '/goals'));
app.post('/goals', (req, res) => proxyRequest(req, res, '/goals'));
app.get('/goals/:id', (req, res) => proxyRequest(req, res, '/goals/' + req.params.id));
app.put('/goals/:id', (req, res) => proxyRequest(req, res, '/goals/' + req.params.id));
app.delete('/goals/:id', (req, res) => proxyRequest(req, res, '/goals/' + req.params.id));

// ─── Intentions Proxy ─────────────────────────────────────────────────────────
app.get('/intentions', (req, res) => proxyRequest(req, res, '/intentions'));
app.post('/intentions', (req, res) => proxyRequest(req, res, '/intentions'));
app.get('/intentions/:id', (req, res) => proxyRequest(req, res, '/intentions/' + req.params.id));
app.put('/intentions/:id', (req, res) => proxyRequest(req, res, '/intentions/' + req.params.id));
app.delete('/intentions/:id', (req, res) => proxyRequest(req, res, '/intentions/' + req.params.id));

// ─── Users Proxy ─────────────────────────────────────────────────────────────
app.get('/users', (req, res) => proxyRequest(req, res, '/users'));
app.get('/users/:id', (req, res) => proxyRequest(req, res, '/users/' + req.params.id));

// ─── Catch-all: Serve Frontend ────────────────────────────────────────────────
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Proxy Helper ────────────────────────────────────────────────────────────
function proxyRequest(req, res, targetPath) {
    const backendUrl = new URL(HASKELL_BACKEND + targetPath);
    const isHttps = backendUrl.protocol === 'https:';
    const lib = isHttps ? https : http;

    const bodyStr = req.body && Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : '';

    const options = {
        hostname: backendUrl.hostname,
        port: backendUrl.port || (isHttps ? 443 : 80),
        path: backendUrl.pathname + (backendUrl.search || ''),
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(req.headers.authorization ? { 'Authorization': req.headers.authorization } : {}),
            ...(bodyStr ? { 'Content-Length': Buffer.byteLength(bodyStr) } : {})
        }
    };

    const proxyReq = lib.request(options, (proxyRes) => {
        res.status(proxyRes.statusCode);
        res.set('Content-Type', 'application/json');
        proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
        console.warn(`[Proxy] Haskell backend unreachable at ${HASKELL_BACKEND}: ${err.message}`);
        res.status(503).json({
            error: 'HIT Backend offline',
            message: 'Start with: cd <HIT-repo> && docker-compose up',
            backend: HASKELL_BACKEND
        });
    });

    if (bodyStr) proxyReq.write(bodyStr);
    proxyReq.end();
}

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n╔══════════════════════════════════════════════════╗`);
    console.log(`║  HIT Tracker Proxy Server                        ║`);
    console.log(`║  Frontend: http://localhost:${PORT}                  ║`);
    console.log(`║  Proxying to: ${HASKELL_BACKEND}           ║`);
    console.log(`╚══════════════════════════════════════════════════╝`);
    console.log(`\n  To start the Haskell backend:`);
    console.log(`  git clone https://github.com/Hcatlab/HIT`);
    console.log(`  cd HIT && docker-compose up\n`);
});
