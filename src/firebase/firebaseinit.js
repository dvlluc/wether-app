import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB7TU54LzzR1fizVBfo52_hhDjo-qGNvh8",
  authDomain: "wetherapp-92755.firebaseapp.com",
  projectId: "wetherapp-92755",
  storageBucket: "wetherapp-92755.appspot.com",
  messagingSenderId: "948247054549",
  appId: "1:948247054549:web:e17c3d0c20a04fa9c67a5c",
};
const firebaseApp = initializeApp(firebaseConfig);
// Get a reference to the database service
const db = getFirestore(firebaseApp);
export default db;
