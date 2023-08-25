// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDOoth-jOXYgfQOnApGMF9wZ8ZGeCcgT4E',
  authDomain: 'wireless-plus.firebaseapp.com',
  projectId: 'wireless-plus',
  storageBucket: 'wireless-plus.appspot.com',
  messagingSenderId: '18773004775',
  appId: '1:18773004775:web:3d45f7970965e91474ad42',
  measurementId: 'G-1P7H3139T4',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
