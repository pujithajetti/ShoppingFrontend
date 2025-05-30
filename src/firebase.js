// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcmzuB1Mayaik_kB7yIGqv8jVeY7YqTF8",
  authDomain: "shopping-3a785.firebaseapp.com",
  projectId:  "shopping-3a785",
  storageBucket:  "shopping-3a785.appspot.com", 
  messagingSenderId:  "870407371849",
  appId: "1:870407371849:web:389f4083374e1d72a61398",
  measurementId: "G-HXF2F2QF9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase Auth and Google provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // ✅ renamed to match your import in components
