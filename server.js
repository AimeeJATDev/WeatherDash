import { createServer } from 'http';
import { exists as _exists, createReadStream } from 'fs';
import { resolve, extname } from 'path';

const server = createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = 'dashboard/dashboard.html';
        else fileUrl = req.url;

        var filePath = resolve('./weatherDash' + fileUrl);
        const fileExt = extname(filePath);
        if (fileExt == '.html') {
            _exists(filePath, (exists) => {
                if (!exists) {
                    filePath = resolve('./weatherDash/404.html');
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    createReadStream(filePath).pipe(res);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                createReadStream(filePath).pipe(res);
            });
        }
        else if (fileExt == '.css') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            createReadStream(filePath).pipe(res);
        }
        else {
            filePath = resolve('./weatherDash/404.html');
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            createReadStream(filePath).pipe(res);
        }
    }
    else {
        filePath = resolve('./weatherDash/404.html');
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        createReadStream(filePath).pipe(res);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});