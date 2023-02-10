// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig ={
  apiKey: process.env.NEXT_PUBLIC_API_KEY,  
  authDomain:   process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STROAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MESAUREMENT_ID
  };

// Initialize Firebase
if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)




export {firebase}

const auth  = firebase.auth()
const firestore = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
const human = firebase.auth().currentUser

export {auth,firestore,storage,serverTimestamp,human}