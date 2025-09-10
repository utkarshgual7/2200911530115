const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;
const store = new Map();

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle POST /shorturls - Create short URL
  if (req.url === '/shorturls' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const shortcode = data.shortcode || Math.random().toString(36).substring(2, 8);
        const validity = data.validity || 30;
        
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + validity);
        
        store.set(shortcode, {
          url: data.url,
          expiry: expiry
        });
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          shortlink: `http://localhost:${port}/${shortcode}`,
          expiry: expiry.toISOString() 
        }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }
  
  // Handle GET /:shortcode - Redirect to original URL
  if (req.url.startsWith('/') && req.method === 'GET' && req.url !== '/') {
    const shortcode = req.url.substring(1);
    const record = store.get(shortcode);
    
    if (record) {
      const now = new Date();
      if (now < record.expiry) {
        res.writeHead(302, { 'Location': record.url });
        res.end();
        return;
      } else {
        store.delete(shortcode);
      }
    }
    
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Short URL not found or expired' }));
    return;
  }
  
  // if user is trying to access "/" page then show the avialbale apis
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h1>URL Shortener Service</h1>
      <p>API Endpoints:</p>
      <ul>
        <li>POST /shorturls - Create a short URL</li>
        <li>GET /:shortcode - Redirect to original URL</li>
      </ul>
    `);
    return;
  }
  
  // otherwise show 404 for all other routes 
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
});

server.listen(port, () => {
  console.log(`URL Shortener service running on port ${port}`);
});