const crypto = require('crypto');
const { adminPassword } = require('../config/password.json');

const algorithm = 'aes-256-cbc';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';


module.exports.encrypt = (text) => {
  // const key = crypto.scryptSync(adminPassword, 'salt', 32);
  // console.log(key);
  const hash = crypto.createHash('sha256');
  hash.update(adminPassword);
  const hashStr = hash.digest('hex');
  const keyBuffer = Buffer.from(hashStr, 'hex');

  const iv = Buffer.alloc(16, 0);

  const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);

  let encrypted = cipher.update(text, inputEncoding, outputEncoding);
  encrypted += cipher.final(outputEncoding);
  return encrypted;
};

module.exports.decrypt = (text) => {
  // const key = crypto.scryptSync(adminPassword, 'salt', 32);
  const hash = crypto.createHash('sha256');
  hash.update(adminPassword);
  const hashStr = hash.digest('hex');
  const keyBuffer = Buffer.from(hashStr, 'hex');

  const iv = Buffer.alloc(16, 0);

  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);

  let decrypted = decipher.update(text, outputEncoding, inputEncoding);
  decrypted += decipher.final(inputEncoding);
  return decrypted;
};
