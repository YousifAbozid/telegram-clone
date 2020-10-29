// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB58gs8Tn3YvE5sgOqtv9NR3SMuS2HU3Lw",
  authDomain: "telegram-clone-baxodirov09.firebaseapp.com",
  databaseURL: "https://telegram-clone-baxodirov09.firebaseio.com",
  projectId: "telegram-clone-baxodirov09",
  storageBucket: "telegram-clone-baxodirov09.appspot.com",
  messagingSenderId: "783236753219",
  appId: "1:783236753219:web:5fa89d506893ea2f62f1f6",
  measurementId: "G-PGC57BFBKD",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
