// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
import { getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOW6kmxZcw7xEV6udS-thSQK0mWTRghTM",
  authDomain: "anferlinks.firebaseapp.com",
  projectId: "anferlinks",
  storageBucket: "anferlinks.firebasestorage.app",
  messagingSenderId: "686681890181",
  appId: "1:686681890181:web:1146b6854c0b025f4e38ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db} 