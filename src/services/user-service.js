 
import CryptoJS from 'crypto-js';
const UserService = { 
  setUser: function (arg) {
    let stringify = JSON.stringify(arg);
    let encrypted = CryptoJS.AES.encrypt(
      stringify,
      'yellowGreenBeard'
    ).toString();
    localStorage.setItem('user', encrypted); 
  },
  getUSer: function () {
    var bytes = CryptoJS.AES.decrypt(
      localStorage.getItem('user'),
      'yellowGreenBeard'
    );
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    let us = JSON.parse(originalText);
    return us;
  },
};
export default UserService;
