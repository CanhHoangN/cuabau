import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDQr6FG-m64MBplQlMeJs3stEnt9czIAxI",
    authDomain: "cuabau-bf9ec.firebaseapp.com",
    databaseURL: "https://cuabau-bf9ec.firebaseio.com",
    projectId: "cuabau-bf9ec",
    storageBucket: "cuabau-bf9ec.appspot.com",
    messagingSenderId: "881562712576",
    appId: "1:881562712576:web:461115e37449c1cb7f36e5",
    measurementId: "G-V2HF1E78KG"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;