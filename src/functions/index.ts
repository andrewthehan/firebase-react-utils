import { getFunctions, httpsCallable } from "firebase/functions";

export function callCloudFunction(name: string, args: any[]) {
  return httpsCallable(getFunctions(), name)(args);
}
