const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const formidable = require('formidable');

const password = require('../config/password.json');

const port = process.env.PORT;

const app = express();

let videoKey = JSON.stringify(Math.round(Math.random() * 1000000000000000));

setInterval(() => {
  videoKey = JSON.stringify(Math.round(Math.random() * 1000000000000000));
}, 60 * 60 * 1000);

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

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
  res.json({
    pass: (req.body.password === password.videoPassword) ? videoKey : 'error',
  });
});

app.get('/api/video/:file/:pass', async (req, res) => {
  if (req.params.pass === videoKey) {
    const filePath = path.join(__dirname, '..', 'data', req.params.file);
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

  // console.log(req.body);

  const form = new formidable.IncomingForm();
  const dir = path.join(__dirname, '..', 'data');

  form.uploadDir = dir;
  form.keepExtensions = true;
  form.maxFieldsSize = 10 * 1024 * 1024;
  form.maxFields = 1000;
  form.multiples = false;

  form.parse(req, () => {});

  form.on('file', (field, file) => {
    const fileName = Date.now().toString();
    const newPath = path.join(file.path, '..', fileName);
    fs.rename(file.path, newPath, (err) => {
      if (err) throw err;
    });
    res.status(200).send('success');
  });
});

app.listen(port || 5000, async () => {
  // await contract();
  console.log(`listening on port ${port || 5000}`);
});
