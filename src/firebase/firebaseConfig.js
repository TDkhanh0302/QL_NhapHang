import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAQ1hv-S-lr_glYa2AhznicdK-iTsjZnoY',
  authDomain: 'ql-nhap-hang.firebaseapp.com',
  databaseURL:
    'https://ql-nhap-hang-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'ql-nhap-hang',
  storageBucket: 'ql-nhap-hang.appspot.com',
  messagingSenderId: '919530773466',
  appId: '1:919530773466:web:a92e5a437cd7b6d4637ee3',
  measurementId: 'G-RTL96VWGM9',
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const storage = firebase.storage();
export const realtimeDB = firebase.database();
