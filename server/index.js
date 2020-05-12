const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const { encrypt, decrypt } = require('./encrypt');
const password = require('../config/password.json');

const port = process.env.PORT;

const app = express();

const videoKeys = {};

const uploadTokens = {};

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'data', 'videos'));
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

app.get('/api/content', (req, res) => {
  const filePath = path.join(__dirname, '..', 'data', 'content.json');
  const rawdata = fs.readFileSync(filePath);
  let dataJson = JSON.parse(rawdata);
  dataJson = dataJson.map((e) => {
    const pdf = e.pdf.map((name) => {
      const pdfPath = path.join(__dirname, '..', 'data', 'pdfs', name);
      const pdfData = fs.readFileSync(pdfPath);
      return JSON.parse(pdfData);
    });
    const video = e.video.map((name) => {
      const videoPath = path.join(__dirname, '..', 'data', 'videos', name);
      const videoData = fs.readFileSync(videoPath);
      return JSON.parse(videoData);
    });
    video.sort(({ index: a }, { index: b }) => (a - b));
    return { ...e, pdf, video };
  });
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
  const filePath = path.join(__dirname, '..', 'data', 'videos', req.params.file);
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

app.get('/api/get_token', (req, res) => {
  const newKey = JSON.stringify(Math.round(Math.random() * 1000000000000000));
  uploadTokens[newKey] = true;
  setTimeout(() => { delete uploadTokens[newKey]; }, 2 * 60 * 60 * 1000);
  res.json({
    token: newKey,
  });
});

app.post('/api/upload/video', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      fs.unlinkSync(req.file.path);
      return res.status(500).json(err);
    }
    if (err) {
      fs.unlinkSync(req.file.path);
      return res.status(500).json(err);
    }
    const token = decrypt(req.body.token);
    if (!uploadTokens[token]) {
      fs.unlinkSync(req.file.path);
      return res.status(500).send('Token Error');
    }
    const { dir, base, name } = path.parse(req.file.path);
    fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify({
      videoTitle: name,
      videoLink: `/video/${base}`,
      index: 0,
      week: -1,
    }));
    delete uploadTokens[token];
    return res.status(200).send(req.file);
  });
});

app.get('/api/all_videos', (req, res) => {
  const videoPath = path.join(__dirname, '..', 'data', 'videos');
  let jsonFiles = fs.readdirSync(videoPath);
  jsonFiles = jsonFiles.filter((file) => (
    path.extname(file) === '.json'
  ));
  jsonFiles = jsonFiles.map((file) => {
    const rawdata = fs.readFileSync(path.join(videoPath, file));
    const dataJson = JSON.parse(rawdata);
    return dataJson;
  });
  const encryptedData = encrypt(JSON.stringify(jsonFiles));
  res.send(encryptedData);
});

app.post('/api/change_content/video', (req, res) => {
  // console.log(req.body)
  const dec = decrypt(req.body.data);
  const { time, data: dataJson } = JSON.parse(dec);

  if (Date.now() - time < 10000) {
    dataJson.forEach((item) => {
      const { name } = path.parse(item.videoLink);
      const filepath = path.join(__dirname, '..', 'data', 'videos', `${name}.json`);
      let rawdata = fs.readFileSync(filepath);
      const videoJson = JSON.parse(rawdata);
      if (videoJson.week !== item.week) {
        const contentPath = path.join(__dirname, '..', 'data', 'content.json');
        rawdata = fs.readFileSync(contentPath);
        const contentJson = JSON.parse(rawdata);
        if (videoJson.week !== -1) {
          const idx = contentJson[videoJson.week].video.indexOf(`${name}.json`);
          if (idx >= 0) {
            contentJson[videoJson.week].video.splice(idx, 1);
          }
        }
        if (item.week !== -1) {
          contentJson[item.week].video.push(`${name}.json`);
        }
        fs.writeFileSync(contentPath, JSON.stringify(contentJson));
      }
      fs.writeFileSync(filepath, JSON.stringify(item));
    });
    res.status(200).send('success');
  } else {
    res.status(400).send('fail');
  }
});

app.post('/api/admin/password', (req, res) => {
  // console.log(req.body);
  try {
    const dec = decrypt(req.body.data);
    const { time } = JSON.parse(dec);
    res.json({
      pass: (Date.now() - time < 10000) ? 'pass' : 'error',
    });
  } catch (e) {
    res.json({
      pass: 'error',
    });
  }
});

app.listen(port || 5000, async () => {
  // await contract();
  // const encryptedData = encrypt('jsonFiles');
  // console.log(encryptedData);
  // const dec = decrypt(encryptedData);
  // console.log(dec);
  console.log(`listening on port ${port || 5000}`);
});
