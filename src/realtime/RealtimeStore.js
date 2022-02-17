import firebase from "firebase";
import { isAnyNull } from "../Utils";

export function getDatabase() {
  return firebase.database();
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
  return database.ref(ids.join("/"));
}

export function registerListener(database, ids, callback) {
  const ref = getRef(database, ids);
  const f = (snapshot) => callback(snapshot.val());
  ref.on("value", f);
  return () => {
    ref.off("value", f);
  };
}

export async function exists(database, ids) {
  return (await getRef(database, ids).once("value")).exists();
}

export async function getData(database, ids) {
  const snapshot = await getRef(database, ids).once("value");
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
