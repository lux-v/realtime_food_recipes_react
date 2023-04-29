import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const app = firebase.initializeApp(firebaseConfig)


export default app;

export const auth = firebase.auth();
export const firestore = firebase.firestore;
export const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
export const arrayRemove = firebase.firestore.FieldValue.arrayRemove;