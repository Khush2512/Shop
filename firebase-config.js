// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const db = firebase.firestore();

// // Enable offline persistence
// db.enablePersistence()
//   .catch(err => {
//     console.log("Firebase persistence error:", err);
//   });

// firebase given js

//  // Import the functions you need from the SDKs you need
//  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
//  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
//  // TODO: Add SDKs for Firebase products that you want to use
//  // https://firebase.google.com/docs/web/setup#available-libraries

//  // Your web app's Firebase configuration
//  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//  const firebaseConfig = {
//    apiKey: "AIzaSyDutkbPIWc6tPR3JC12rwBn__IxkMsQcX8",
//    authDomain: "fishandchipsshop-0344.firebaseapp.com",
//    databaseURL: "https://fishandchipsshop-0344-default-rtdb.europe-west1.firebasedatabase.app",
//    projectId: "fishandchipsshop-0344",
//    storageBucket: "fishandchipsshop-0344.firebasestorage.app",
//    messagingSenderId: "1022837582449",
//    appId: "1:1022837582449:web:5a937243ebfafc3931c9d0",
//    measurementId: "G-TBC2V7YTRL"
//  };

//  // Initialize Firebase
//  const app = initializeApp(firebaseConfig);
//  const analytics = getAnalytics(app);
//  export { db };


// new deepseek given js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { 
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  increment,
  enableIndexedDbPersistence
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDutkbPIWc6tPR3JC12rwBn__IxkMsQcX8",
  authDomain: "fishandchipsshop-0344.firebaseapp.com",
  projectId: "fishandchipsshop-0344",
  storageBucket: "fishandchipsshop-0344.appspot.com",
  messagingSenderId: "1022837582449",
  appId: "1:1022837582449:web:5a937243ebfafc3931c9d0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    console.warn("Offline persistence already enabled in another tab");
  } else if (err.code == 'unimplemented') {
    console.warn("Browser doesn't support offline persistence");
  }
});

export { 
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  increment
};
/**
 * Security Rules Note:
 * 
 * Set these Firestore rules in your Firebase Console:
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /users/{userId} {
 *       allow read, write: if request.auth != null && request.auth.uid == userId;
 *       
 *       match /cart/{itemId} {
 *         allow read, write: if request.auth != null && request.auth.uid == userId;
 *       }
 *     }
 *     
 *     match /menu/{itemId} {
 *       allow read: if true;
 *       allow write: if request.auth.token.admin == true;
 *     }
 *   }
 * }
 */