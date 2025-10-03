import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cargotrans-473716.firebaseapp.com",
  projectId: "cargotrans-473716",
  storageBucket: "cargotrans-473716.firebasestorage.app",
  messagingSenderId: "764923891343",
  appId: "1:764923891343:web:4696700970ac7dc8baeafa",
  measurementId: "G-RQEGGH5PEX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);