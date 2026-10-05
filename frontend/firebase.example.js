// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE-1yZTX2-MqT83UXQIELnMGRu969sE_I", // OLD KEY
  authDomain: "routine-clicker.firebaseapp.com",
  databaseURL: "https://routine-clicker-default-rtdb.firebaseio.com",
  projectId: "routine-clicker",
  storageBucket: "routine-clicker.firebasestorage.app",
  messagingSenderId: "615866686886",
  appId: "1:615866686886:web:a4f478173c520cff4b0367"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, onValue };