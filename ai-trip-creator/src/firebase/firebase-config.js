import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getProfileDB } from "firebase/firestore/collection/Profile"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:  REACT_APP_FIREBASE_apiKey,
  authDomain: REACT_APP_FIREBASE_authDomain,
  databaseURL: REACT_APP_FIREBASE_databaseURL,
  projectId: REACT_APP_FIREBASE_projectId,
  storageBucket:  REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: REACT_APP_FIREBASE_messagingSenderId,
  appId: REACT_APP_FIREBASE_appId,
  measurementId:REACT_APP_FIREBASE_measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getProfileDB(app);
const firestore = getFirestore(app);
const db = getFirestore(app);
export { auth, firestore,db };
