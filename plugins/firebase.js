import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
 const config = {
   apiKey: "AIzaSyDuPyA8Wgai08ZXtFnCdbn2Ztxo48Uo280",
   authDomain: "slack-clone-app-c3dfd.firebaseapp.com",
   projectId: "slack-clone-app-c3dfd",
   storageBucket: "slack-clone-app-c3dfd.appspot.com",
   messagingSenderId: "1000598704921",
   appId: "1:1000598704921:web:d0737c74416cdc1e802b88",
   measurementId: "G-BT3CRP3EN7"
 }
 firebase.initializeApp(config)
}

const db = firebase.firestore()
export {
 firebase,
 db
}