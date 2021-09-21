import Firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'
// import { seedDatabase } from "../seed";


const config = {
    apiKey: "AIzaSyA9maCEtqHdIYMh7skSkinNz3ykhGZoj-A",
  authDomain: "instagram-1e84b.firebaseapp.com",
  projectId: "instagram-1e84b",
  storageBucket: "instagram-1e84b.appspot.com",
  messagingSenderId: "591705645351",
  appId: "1:591705645351:web:2a96a75aa2c2d595b5c902"
};
const firebase = Firebase.initializeApp(config)
const {FieldValue} = Firebase.firestore;


// Will call seed file only once
// seedDatabase(firebase)
console.log("firebase",firebase)
export {firebase, FieldValue}