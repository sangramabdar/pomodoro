import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsEIvF_odzxtvsvtbzFUpv_nihSBuX5FQ",
  authDomain: "pomodoro-app-4751c.firebaseapp.com",
  projectId: "pomodoro-app-4751c",
  storageBucket: "pomodoro-app-4751c.appspot.com",
  messagingSenderId: "597723783449",
  appId: "1:597723783449:web:5f563f032631a435492588",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
