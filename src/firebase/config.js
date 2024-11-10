import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDnXy9ViYg8S7pxcWM6Hdh6iTdmwKSM-IY",
  authDomain: "classic-dms.firebaseapp.com",
  projectId: "classic-dms",
  storageBucket: "classic-dms.firebasestorage.app",
  messagingSenderId: "203105248592",
  appId: "1:203105248592:web:dd3b5316ed3c67802a7855",
  measurementId: "G-SRFC9P3430"
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app);

