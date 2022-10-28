import { getFunctions, httpsCallable } from "firebase/functions";

export function useLocalFunctionEmulator() {
  getFunctions().useFunctionsEmulator("http://localhost:5001");
}

export function callCloudFunction(name, args) {
  return httpsCallable(getFunctions(), name)(args);
}
