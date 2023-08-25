import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {setDoc,doc} from 'firebase/firestore'

export function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  setDoc(doc(db, 'users', email), {
    savedShows: [],
  })
}

export function logIn(email, password) {
  console.log(email, password)
  return signInWithEmailAndPassword(auth, email, password)
}

export function logOut() {
  return signOut(auth)
}
//get current user
export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}
//get current user
