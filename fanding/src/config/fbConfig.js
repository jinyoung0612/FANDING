import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyD82hQxkY88oLQTJlIfz9aPLSimZYmvzIE",
  authDomain: "test-a81ab.firebaseapp.com",
  databaseURL: "https://test-a81ab.firebaseio.com",
  projectId: "test-a81ab",
  storageBucket: "test-a81ab.appspot.com",
  messagingSenderId: "716123257641",
  appId: "1:716123257641:web:ccb5e9e5074844fdd1d538",
  measurementId: "G-YE3N1ZGT5Y",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore();
// firebase.firestore().settings( {timestampsInSnapshots:true});
var storage = firebase.storage();
// firebase.firestore().settings({ timestampsInSnapshots: true });

export { storage, firebase as default };
