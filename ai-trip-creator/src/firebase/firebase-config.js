import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getProfileDB } from "firebase/firestore/collection/Profile"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwuPv1t0KhiADo9MK7SZbWPgfWNcaTAeA",
  authDomain: "ai-trip-creator.firebaseapp.com",
  databaseURL: "https://ai-trip-creator-default-rtdb.firebaseio.com",
  projectId: "ai-trip-creator",
  storageBucket: "ai-trip-creator.appspot.com",
  messagingSenderId: "300004223652",
  appId: "1:300004223652:web:a2b08dffaeb9f9b44fd431",
  measurementId: "G-K1EFHGGM1S",
};
const OPENAI_API_KEY = "sk-tjd1xcWh7Ck-AjPnl7JcXT9OL1OD9vK0_KDp9PFFv4T3BlbkFJUxuMu8s27u0Cle3ugGVd0S8mwJS6gi6zxQbcvoKMoA"
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getProfileDB(app);
const firestore = getFirestore(app);
const db = getFirestore(app);
export { auth, firestore,db, app, OPENAI_API_KEY };


