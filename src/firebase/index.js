// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUnlWr0TbeMeA17eJ4lHXEncR2JcmfAXE",
  authDomain: "vue-auth-f7772.firebaseapp.com",
  projectId: "vue-auth-f7772",
  storageBucket: "vue-auth-f7772.appspot.com",
  messagingSenderId: "303902384901",
  appId: "1:303902384901:web:28f38a374c2a78695c0d6c",
  measurementId: "G-LBY0Z3J87T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}
