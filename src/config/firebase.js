// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVuvEn-IBipNLmDl5FTmwvLY0wR7lJZxk",
  authDomain: "expense-tracker-7a755.firebaseapp.com",
  projectId: "expense-tracker-7a755",
  storageBucket: "expense-tracker-7a755.appspot.com",
  messagingSenderId: "31190310794",
  appId: "1:31190310794:web:b89ef578b26cee55ea7273",
  measurementId: "G-W018G3Y9DF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);