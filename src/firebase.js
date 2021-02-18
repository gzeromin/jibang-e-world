import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyA4nSO98OQiNykpl837KQv0JL51jo9_eMM",
  authDomain: "jibang-e-world.firebaseapp.com",
  projectId: "jibang-e-world",
  storageBucket: "jibang-e-world.appspot.com",
  messagingSenderId: "962456533151",
  appId: "1:962456533151:web:b03d203ac951050ff80aaa",
  measurementId: "G-8MR298PECQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase;