
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCelbX9e7WZ69dAgwRWS2MKhSsJuqj0eCA",
  authDomain: "reactlinks-fd205.firebaseapp.com",
  projectId: "reactlinks-fd205",
  storageBucket: "reactlinks-fd205.firebasestorage.app",
  messagingSenderId: "419419412312",
  appId: "1:419419412312:web:3936ecb70c6230388ef72d"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db}
