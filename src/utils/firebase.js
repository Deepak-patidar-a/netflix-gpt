// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMo2_zw78xx-HiXFlvnJ3nFPUKbJQ-MLA",
  authDomain: "netflixgpt-c225e.firebaseapp.com",
  projectId: "netflixgpt-c225e",
  storageBucket: "netflixgpt-c225e.firebasestorage.app",
  messagingSenderId: "227854572850",
  appId: "1:227854572850:web:caf0546c8d9b7df70e4b2b",
  measurementId: "G-83TRF1E6S1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()