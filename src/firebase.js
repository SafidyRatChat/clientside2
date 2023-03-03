import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; /*for the collection*/

const firebaseConfig = {
  apiKey: "AIzaSyAfOf0MfstCDazyUlrdBkFH6FKyoUEmqlw",
  authDomain: "bystephcommerce.firebaseapp.com",
  projectId: "bystephcommerce",
  storageBucket: "bystephcommerce.appspot.com",
  messagingSenderId: "797794829651",
  appId: "1:797794829651:web:b8423ec415bc96e86e0da6",
  measurementId: "G-SJHL05KB92"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
