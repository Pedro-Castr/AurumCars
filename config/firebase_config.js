import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkzjBcYTN0VPffi0gj1Qt4yg5goLz_AoM",
  authDomain: "carros-ca9d7.firebaseapp.com",
  projectId: "carros-ca9d7",
  storageBucket: "carros-ca9d7.firebasestorage.app",
  messagingSenderId: "764662525686",
  appId: "1:764662525686:web:4974dce2ad776d3482c6d7",
  measurementId: "G-N4JRLJ9N8T",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.firestore();

export default database;
