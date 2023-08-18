import { initializeApp } from "/firebase/app";
import { getAuth } from "/firebase/auth";

import '../../node_modules/firebase/firestore';
import '../../node_modules/firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyDq27DK3GNFKI7r26F4vlm2Xansix-685M",
  authDomain: "login-register-subs.firebaseapp.com",
  databaseURL: "https://login-register-subs-default-rtdb.firebaseio.com",
  projectId: "login-register-subs",
  storageBucket: "login-register-subs.appspot.com",
  messagingSenderId: "714480620553",
  appId: "1:714480620553:web:8a759789d7679588c254d8",
  measurementId: "G-8SP6DZMZFR"
};


// export const auth = firebase.auth();
const auth = getAuth(app);

const app = initializeApp(firebaseConfig); 
// export const firestore = firebase.firestore();
// export const database = firebase.database();

export default firebase;
