// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGCkRlxQBDM7OEChTzoypFNOguimYirtc",
  authDomain: "mern-shop-26bc4.firebaseapp.com",
  projectId: "mern-shop-26bc4",
  storageBucket: "mern-shop-26bc4.appspot.com",
  messagingSenderId: "933465462182",
  appId: "1:933465462182:web:e3be5dfd10f4e8881a6b67",
  measurementId: "G-YSYS3K361S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
