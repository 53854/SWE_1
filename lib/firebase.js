// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkF859yZx4UErDhCxfysxCIf7dpkYDUQU",
  authDomain: "swe-expensetracker.firebaseapp.com",
  projectId: "swe-expensetracker",
  storageBucket: "swe-expensetracker.appspot.com",
  messagingSenderId: "989470254913",
  appId: "1:989470254913:web:ee751552435100947a23c0"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

// Auth
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore
export const firestore = firebase.firestore();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

// Storage
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;


/// Helper functions

/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */
 export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function expenseToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),

  };
}