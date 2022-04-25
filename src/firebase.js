import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCj4e29XkigwiL6x3wOcW1C5NqLfAvTr-I",
  authDomain: "auth-demo-dev-af132.firebaseapp.com",
  projectId: "auth-demo-dev-af132",
  storageBucket: "auth-demo-dev-af132.appspot.com",
  messagingSenderId: "1025272889081",
  appId: "1:1025272889081:web:4ee0d331a66c9ca369ec28",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
