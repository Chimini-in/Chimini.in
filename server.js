const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json'
};

http.createServer((req, res) => {
  let decodedUrl = decodeURIComponent(req.url.split('?')[0]);
  const queryStr = req.url.split('?')[1] || '';
  const queryString = queryStr ? '?' + queryStr : '';

  // Clean trailing slashes if present (except for root '/')
  if (decodedUrl.endsWith('/') && decodedUrl.length > 1) {
    decodedUrl = decodedUrl.slice(0, -1);
  }

  // Old routes mapping to clean routes for redirects
  const redirectMap = {
    '/index.html': '/home',
    '/shop.html': '/shop',
    '/collections.html': '/collections',
    '/gifts.html': '/gifts',
    '/about.html': '/about',
    '/contact.html': '/contact'
  };

  // Redirect old .html requests to clean URLs (301 Permanent Redirect)
  if (redirectMap[decodedUrl]) {
    res.writeHead(301, { 'Location': redirectMap[decodedUrl] + queryString });
    res.end();
    return;
  }

  // Route map for clean URLs to physical HTML files
  const routeMap = {
    '/': 'index.html',
    '/home': 'index.html',
    '/shop': 'shop.html',
    '/collections': 'collections.html',
    '/gifts': 'gifts.html',
    '/about': 'about.html',
    '/contact': 'contact.html'
  };

  let relativePath = routeMap[decodedUrl] || decodedUrl;
  let filePath = path.join(__dirname, relativePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Error: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
