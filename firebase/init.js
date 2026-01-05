// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfV8O6djXkPPAmfCgMzeSf9TOhOp8I2Jk",
  authDomain: "fir-practice-9f4b4.firebaseapp.com",
  projectId: "fir-practice-9f4b4",
  storageBucket: "fir-practice-9f4b4.firebasestorage.app",
  messagingSenderId: "741914632228",
  appId: "1:741914632228:web:aee7c1f597ba2a295c78b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();