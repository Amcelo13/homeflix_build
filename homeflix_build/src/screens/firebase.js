import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyB81y4iA5u174DubsJLL1RO54KMJbVki40",
    authDomain: "homeflix-bu  ild-app.firebaseapp.com",
    projectId: "homeflix-build-app",
    storageBucket: "homeflix-build-app.appspot.com",
    messagingSenderId: "754858605627",
    appId: "1:754858605627:web:5412fff1780f042644301e"
  };
  //Initialsing the firebase app
  const firebaseApp = initializeApp(firebaseConfig)

   //Initialsing the firestore in 'db'
  const db =  getFirestore()
   
  //Initialsing the firebase auth
  const auth = getAuth()

  export {auth}
  export default db;
  