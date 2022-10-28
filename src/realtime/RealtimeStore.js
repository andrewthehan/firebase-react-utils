import { isAnyNull } from "../Utils";
import {
  getDatabase as firebaseGetDatabase,
  ref,
  get,
  onValue,
} from "firebase/database";

export function getDatabase(app) {
  return firebaseGetDatabase(app);
}

export function isValid(ids) {
  return ids != null && !isAnyNull(...ids);
}

export function checkIsValid(ids) {
  if (!isValid(ids)) {
    throw new Error(`Invalid ids: ${ids}`);
  }
}

export function getRef(database, ids) {
  checkIsValid(ids);
  return ref(database, ids.join("/"));
}

export function registerListener(database, ids, callback) {
  const ref = getRef(database, ids);
  const f = (snapshot) => callback(snapshot.val());
  return onValue(ref, f);
}

export async function exists(database, ids) {
  return (await get(getRef(database, ids))).exists();
}

export async function getData(database, ids) {
  const snapshot = await get(getRef(database, ids));
  return snapshot.val();
}

export async function addData(database, ids, data) {
  const ref = await getRef(database, ids).push(data);
  return ref.key;
}

export async function setData(database, ids, data) {
  return await getRef(database, ids).set(data);
}

export async function updateData(database, ids, data) {
  return await getRef(database, ids).update(data);
}

export async function deleteData(database, ids) {
  return await getRef(database, ids).remove();
}

export async function transaction(database, ids, updateFunction) {
  await getRef(database, ids).transaction(updateFunction);
}

export async function updateOnDisconnect(database, ids, data) {
  const ref = getRef(database, ids);
  const disconnectRef = ref.onDisconnect();

  await disconnectRef.update(data);
  return disconnectRef;
}
