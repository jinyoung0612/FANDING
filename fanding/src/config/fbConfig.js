import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/storage';

var firebaseConfig = {
        apiKey: "AIzaSyD8H95JUH15B5k0TCD4XFA5KvX0DyZF06k",
        authDomain: "fanding-ab2a1.firebaseapp.com",
        databaseURL: "https://fanding-ab2a1.firebaseio.com",
        projectId: "fanding-ab2a1",
        storageBucket: "fanding-ab2a1.appspot.com",
        messagingSenderId: "958181443781",
        appId: "1:958181443781:web:e6c53dcab597a40f6648ac",
        measurementId: "G-CZVVTTYJBD"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore();
// firebase.firestore().settings( {timestampsInSnapshots:true});
var storage = firebase.storage();
// firebase.firestore().settings({ timestampsInSnapshots: true });


export {
        storage, firebase as default
}