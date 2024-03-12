import {Injectable} from '@angular/core';
// @ts-ignore
import SecureStorage from 'secure-web-storage';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'secret_key';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {

  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key: any): any {
      // @ts-ignore
      key = CryptoJS.SHA256(key, SECRET_KEY);
      return key.toString();
    },
// Encrypt the localstorage data
    encrypt: function encrypt(data: any) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);
      data = data.toString();
      return data;
    },
// Decrypt the encrypted data
    decrypt: function decrypt(data: any) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
    }
  });

  constructor() {
  }
}
