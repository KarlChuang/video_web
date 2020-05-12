export const encrypt = async (password, dataStr) => {
  const iv = new ArrayBuffer(16);

  const encoder = new TextEncoder();
  const passData = encoder.encode(password);
  const digest = await window.crypto.subtle.digest('SHA-256', passData);
  const key = await window.crypto.subtle.importKey('raw', digest, {
    name: 'AES-CBC',
    length: 256,
  }, false, ['encrypt', 'decrypt']);

  const dataEncoder = new TextEncoder();
  const dataBuffer = dataEncoder.encode(dataStr);

  const encrypted = await window.crypto.subtle.encrypt({
    name: 'AES-CBC',
    iv,
  }, key, dataBuffer);
  const str = Buffer.from(new Uint8Array(encrypted)).toString('hex');
  return str;
};

export const decrypt = async (password, encryptedHex) => {
  const iv = new ArrayBuffer(16);
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const key = await window.crypto.subtle.importKey('raw', digest, {
    name: 'AES-CBC',
    length: 256,
  }, false, ['encrypt', 'decrypt']);

  const dataBuffer = Buffer.from(encryptedHex, 'hex');

  const decrypted = await window.crypto.subtle.decrypt({
    name: 'AES-CBC',
    iv,
  }, key, dataBuffer);
  const str = String.fromCharCode.apply(null, new Uint8Array(decrypted));
  return str;
};
