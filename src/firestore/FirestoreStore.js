import { isAnyNull } from "../Utils";
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";

export function getDatabase(app) {
  return getFirestore(app);
}

export function isValid(ids) {
  return ids != null && !isAnyNull(ids);
}

export function checkIsValid(ids) {
  if (!isValid(ids)) {
    throw new Error(`Invalid ids: ${ids}`);
  }
}

export function isDoc(ids) {
  return ids.length % 2 === 0;
}

export function checkIsDoc(ids) {
  if (!isDoc(ids)) {
    throw new Error(`Tried to find a doc with an invalid id path: ${ids}`);
  }
}

export function checkIsCollection(ids) {
  if (isDoc(ids)) {
    throw new Error(
      `Tried to find a collection with an invalid id path: ${ids}`
    );
  }
}

export function getRef(database, ids) {
  checkIsValid(ids);

  return ids.reduce(
    (ref, id, i) => (i % 2 === 0 ? collection(ref, id) : doc(ref, id)),
    database
  );
}

export function registerListener(database, ids, callback) {
  return onSnapshot(getRef(database, ids),
    isDoc(ids)
      ? (d) => callback({ id: d.id, ...d.data() })
      : (c) => callback(c.docs.map((d) => ({ id: d.id, ...d.data() })))
  );
}

export async function exists(database, ids) {
  return (await getDoc(database, ids)).exists;
}

export async function getDoc(database, ids) {
  checkIsDoc(ids);

  return await getRef(database, ids).get();
}

export async function addDoc(database, ids, data) {
  checkIsCollection(ids);

  return await getRef(database, ids).add(data);
}

export async function setDoc(database, ids, data) {
  checkIsDoc(ids);

  return await getRef(database, ids).set(data);
}

export async function updateDoc(database, ids, data) {
  checkIsDoc(ids);

  return await getRef(database, ids).update(data);
}

export async function deleteDoc(database, ids) {
  checkIsDoc(ids);

  return await getRef(database, ids).delete();
}

export async function runTransaction(database, ids, updateFunction) {
  checkIsDoc(ids);
  return await database.runTransaction(async (t) => {
    const ref = getRef(database, ids);

    const doc = (await t.get(ref)).data();
    const updates = updateFunction(doc);
    t.update(ref, updates);
  });
}

export async function onDisconnect(database, ids, data) {
  checkIsDoc(ids);

  const ref = getRef(database, ids);
  const disconnectRef = ref.onDisconnect();
  await disconnectRef.update(data);
  return disconnectRef;
}
