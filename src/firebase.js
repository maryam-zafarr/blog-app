import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjQrMOUYiW3oLr7_9i5tqAIDZs8QVPPns",
  authDomain: "blog-project-cea54.firebaseapp.com",
  projectId: "blog-project-cea54",
  storageBucket: "blog-project-cea54.appspot.com",
  messagingSenderId: "1006349789312",
  appId: "1:1006349789312:web:6a98a09bb4436d87581e65",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
