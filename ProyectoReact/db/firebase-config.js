import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9aHj0-UfGi_TOfDoK9hRei1kpxt7d-aA",
  authDomain: "e-commerce1919.firebaseapp.com",
  projectId: "e-commerce1919",
  storageBucket: "e-commerce1919.appspot.com",
  messagingSenderId: "687264708331",
  appId: "1:687264708331:web:cc739c359bdb49357970ae"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
export default db; 