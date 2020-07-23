import firebase from 'firebase/app';
// import analytics from 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/storage';
// import axios from 'axios'

var firebaseConfig = {
  apiKey: "AIzaSyA26wHeTQZo4_wOYmXOhHjn_cABEQtGfH8",
  authDomain: "fire-members.firebaseapp.com",
  databaseURL: "https://fire-members.firebaseio.com",
  projectId: "fire-members",
  storageBucket: "fire-members.appspot.com",
  messagingSenderId: "128045167026",
  appId: "1:128045167026:web:2470f83f4bff26ff5db4ab",
  measurementId: "G-VCQMQ04GLR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
// const db = firebase.database();
// db.settings({timestampsInSnapshots: true})

export default firebase