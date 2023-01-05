import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOH_ImopHHRQEVEDoIvJPW8U9kCd-TVYQ",
  authDomain: "porfolio-project-374af.firebaseapp.com",
  projectId: "porfolio-project-374af",
  storageBucket: "porfolio-project-374af.appspot.com",
  messagingSenderId: "832084784559",
  appId: "1:832084784559:web:f5e8eeb45b83c35fbc2b5a",
  measurementId: "G-BK44P9CM28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app);
export const db = initializeFirestore(app, {
  // experimentalForceLongPolling: true,
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false,
});
export const storage = getStorage(app);
