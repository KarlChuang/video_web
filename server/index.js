const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const password = require('../config/password.json');

const port = process.env.PORT;

const app = express();

const videoKeys = {};

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'data'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('video');

const router = ['/', '/admin', '/video/:videoId', '/admin/upload_video'];
for (let i = 0; i < router.length; i += 1) {
  app.use(router[i], express.static(path.join(__dirname, '..', 'public')));
  app.use(router[i], express.static(path.join(__dirname, '..', 'dist')));
}

app.get('/api/content', async (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'content.json');
  const rawdata = await fs.readFileSync(filePath);
  const dataJson = JSON.parse(rawdata);
  res.json(dataJson);
});

app.post('/api/password', async (req, res) => {
  const newKey = JSON.stringify(Math.round(Math.random() * 1000000000000000));
  videoKeys[newKey] = true;
  setTimeout(() => { delete videoKeys[newKey]; }, 2 * 60 * 60 * 1000);
  res.json({
    pass: (req.body.password === password.videoPassword) ? newKey : 'error',
  });
});

app.get('/api/video/:file/:pass', async (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', req.params.file);
  if (videoKeys[req.params.pass] && fs.existsSync(filePath)) {
    const stat = await fs.statSync(filePath);
    const fileSize = stat.size;
    const { range } = req.headers;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    res.status(404).send('Not found');
  }
});

app.post('/api/upload/video', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    }
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

app.listen(port || 5000, async () => {
  // await contract();
  console.log(`listening on port ${port || 5000}`);
});
