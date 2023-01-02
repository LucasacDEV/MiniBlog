
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyARa3TPHcQzyttll0PT4VimHaPPbTQk7U4",
  authDomain: "miniblog-c9ac6.firebaseapp.com",
  projectId: "miniblog-c9ac6",
  storageBucket: "miniblog-c9ac6.appspot.com",
  messagingSenderId: "906792646538",
  appId: "1:906792646538:web:9d26a9244269ac9868ba73"
};


const app = initializeApp(firebaseConfig);

const db= getFirestore(app)

export { db };