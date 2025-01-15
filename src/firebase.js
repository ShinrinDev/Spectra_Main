import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: 'AIzaSyCDwno4cBSfDW-Fki4cAEH388q19uZML6o',
  authDomain: 'spectra-1c10e.firebaseapp.com',
  databaseURL: 'https://spectra-1c10e-default-rtdb.firebaseio.com',
  projectId: 'spectra-1c10e',
  storageBucket: 'spectra-1c10e.firebasestorage.app',
  messagingSenderId: '722769025902',
  appId: '1:722769025902:web:8f12a26ee54fd8f49eff7f',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export {db, app}

