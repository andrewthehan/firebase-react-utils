import { initializeApp } from "firebase/app";
import "firebase/auth";

export function initialize(firebaseConfig) {
  return initializeApp(firebaseConfig);
}

export function onUserChange(callback) {
  return firebase.auth().onAuthStateChanged(callback);
}

export function getCurrentUser() {
  return firebase.auth().currentUser;
}

export async function signInAnonymously() {
  return await firebase.auth().signInAnonymously();
}

export async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return await firebase.auth().signInWithPopup(provider);
}

export async function signOut() {
  return await firebase.auth().signOut();
}
