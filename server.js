const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html';

    if (extname === '.css') {
        contentType = 'text/css';
    } else if (extname === '.js') {
        contentType = 'text/javascript';
    } else if (extname === '.svg') {
        contentType = 'image/svg+xml';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                if (contentType === 'text/html') {
                    filePath = './index.html';
                    fs.readFile(filePath, (err, content) => {
                        if (err) {
                            res.writeHead(500);
                            res.end('Internal Server Error');
                        } else {
                            res.writeHead(200, { 'Content-Type': contentType });
                            res.end(content, 'utf-8');
                        }
                    });
                } else {
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
    console.log(`Server running on port ${PORT}`);
});
