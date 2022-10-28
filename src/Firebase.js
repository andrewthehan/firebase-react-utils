import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged as fOnAuthStateChanged,
  signInAnonymously as fSignInAnonymously,
  signInWithPopup as fSignInWithPopup,
  signOut as fSignOut,
  GoogleAuthProvider,
} from "firebase/auth";

export function initialize(firebaseConfig) {
  return initializeApp(firebaseConfig);
}

export function onUserChange(callback) {
  return fOnAuthStateChanged(getAuth(), callback);
}

export function getCurrentUser() {
  return getAuth().currentUser;
}

export async function signInAnonymously() {
  return await fSignInAnonymously(getAuth());
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return await fSignInWithPopup(getAuth(), provider);
}

export async function signOut() {
  return await fSignOut(getAuth());
}
