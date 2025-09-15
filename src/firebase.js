// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCxF71f-_iWNFMgghH6DNKTXeeku1NS1D8",
  authDomain: "bikyoweb.firebaseapp.com",
  projectId: "bikyoweb",
  storageBucket: "bikyoweb.firebasestorage.app",
  messagingSenderId: "733844065629",
  appId: "1:733844065629:web:aaa2a8708385ee8e6dacb4",
  measurementId: "G-1Q3JT69VFY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Init Firestore
export const db = getFirestore(app);
