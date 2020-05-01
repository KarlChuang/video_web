const express = require('express');
const path = require('path');

const port = process.env.PORT;

const app = express();

const router = ['/', '/admin', '/video/:videoId'];
for (let i = 0; i < router.length; i += 1) {
  app.use(router[i], express.static(path.join(__dirname, '..', 'public')));
  app.use(router[i], express.static(path.join(__dirname, '..', 'dist')));
}

app.listen(port || 5000, async () => {
  // await contract();
  console.log(`listening on port ${port || 5000}`);
});
