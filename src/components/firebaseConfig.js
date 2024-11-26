import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCwtz5vszQgEPDKn9kWCVEpbP8VFbr7bl8",
  authDomain: "peliculas-99e7d.firebaseapp.com",
  projectId: "peliculas-99e7d",
  storageBucket: "peliculas-99e7d.appspot.com", 
  messagingSenderId: "895122520856",
  appId: "1:895122520856:web:b7c35cca7beb81abbabc6d",
  measurementId: "G-J1BL338GHE"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export { db, auth, storage };