import firebase from "firebase";

export function useLocalFunctionEmulator() {
  firebase.functions().useFunctionsEmulator("http://localhost:5001");
}

export function callCloudFunction(name, args) {
  return firebase.functions().httpsCallable(name)(args);
}
