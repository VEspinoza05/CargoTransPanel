import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCMs22Pfa5ZvoWDBJbgUfCWtj5jVhmAsk",
  authDomain: "cargotrans-473716.firebaseapp.com",
  projectId: "cargotrans-473716",
  storageBucket: "cargotrans-473716.firebasestorage.app",
  messagingSenderId: "764923891343",
  appId: "1:764923891343:web:af5bad0283212315baeafa",
  measurementId: "G-BQ295PF93X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);