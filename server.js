const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3000;
const MEDIA_DIR = path.join(__dirname, 'media');

if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR);
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(MEDIA_DIR));

function getFiles(dir, baseDir = dir) {
    let results = [];
    try {
        const list = fs.readdirSync(dir, { withFileTypes: true });
        list.forEach(file => {
            const filePath = path.join(dir, file.name);
            if (file.isDirectory()) {
                results = results.concat(getFiles(filePath, baseDir));
            } else {
                if (/\.(mp3|wav|ogg|mp4|mkv|webm)$/i.test(file.name)) {
                    const relativePath = path.relative(baseDir, filePath);
                    results.push(relativePath);
                }
            }
        });
    } catch (e) {
        console.error('Error reading storage directory:', e.message);
    }
    return results;
}

app.get('/api/media', (req, res) => {
    const mediaFiles = getFiles(MEDIA_DIR);
    res.json(mediaFiles);
});

wss.on('connection', (ws) => {
    console.log('Client connected for wireless streaming & telemetry.');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'telemetry') {
                const { bufferHealth, latency } = data;
                let recommendation = 'optimal';
                if (bufferHealth < 2.0 || latency > 300) {
                    recommendation = 'reduce_bitrate';
                }
                ws.send(JSON.stringify({
                    type: 'optimization_directive',
                    action: recommendation
                }));
            }
        } catch (e) {
            console.error('Invalid JSON received');
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected.');
    });
});

server.listen(PORT, () => {
    console.log(`Wireless Media Server running on http://localhost:${PORT}`);
});
