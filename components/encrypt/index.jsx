import { AES, enc } from 'crypto-js';

const secretKey = 's3ntRa-h0t3L'; 

const encryptData = (data) => {
  const encryptedPhone = AES.encrypt(data, secretKey).toString();
  return encryptedPhone;
};

const decryptData = (encryptedData) => {
  const bytes = AES.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(enc.Utf8);
  return decryptedData;
};

export default {    
    encryptData,
    decryptData
}
