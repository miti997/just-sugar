const http = require('http');
const fs = require('fs');
const path = require('path');

// Get the mode from command-line arguments or environment variable
const mode = process.argv[2] || process.env.APP_MODE || 'SPA';

// URL to file mapping for MPA mode
const routes = {
    '/': 'index.html',
    '/users': 'users.html'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    if (mode === 'MPA') {
        // Check if the requested path exists in the routes mapping
        if (routes[req.url]) {
            filePath = './' + routes[req.url];
        } else {
            // In MPA mode, return 404 if the route does not exist
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('404 Not Found');
            return;
        }
    } else {
        // In SPA mode, serve index.html for the root path
        if (filePath === './') {
            filePath = './index.html';
        }
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html';

    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        // Add more content types as needed
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                if (mode === 'SPA') {
                    // In SPA mode, serve index.html for unknown paths
                    filePath = './index.html';
                    fs.readFile(filePath, (err, content) => {
                        if (err) {
                            res.writeHead(500);
                            res.end('Internal Server Error');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(content, 'utf-8');
                        }
                    });
                } else {
                    // In MPA mode, return 404 for unknown paths
                    res.writeHead(404);
                    res.end('404 Not Found');
                }
            } else {
                res.writeHead(500);
                res.end('Internal Server Error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${mode} mode`);
});
