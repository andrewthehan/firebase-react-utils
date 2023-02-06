import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  getDoc,
  onSnapshot,
  Query,
  QuerySnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { isAnyNull, useIsMounted } from "../utils";

type Ids = (string | undefined)[];

type WithId<T> = T & { id: string };

type DocCallback<T> = (doc: WithId<T> | undefined) => void;
type QueryCallback<T> = (docs: WithId<T>[] | undefined) => void;

export function isDoc(ids: Ids): boolean {
  return ids.length % 2 === 0;
}

export function isCollection(ids: Ids): boolean {
  return ids.length % 2 !== 0;
}

export function isValid(ids: Ids): boolean {
  return ids != null && !isAnyNull(...ids);
}

export function checkIsValid(ids: Ids) {
  if (!isValid(ids)) {
    throw new Error(`Invalid ids: ${ids}`);
  }
}

export async function exists(ref: DocumentReference<any>): Promise<boolean> {
  return (await getDoc(ref)).exists();
}

export function registerDocListener<T>(
  ref: DocumentReference<T>,
  callback: DocCallback<T>
) {
  return onSnapshot(ref, (d: DocumentSnapshot<T>) =>
    callback(d.exists() ? ({ id: d.id, ...d.data() } as WithId<T>) : undefined)
  );
}

export function registerQueryListener<T>(
  query: Query<T>,
  callback: QueryCallback<T>
) {
  return onSnapshot(query, (q: QuerySnapshot<T>) =>
    callback(q.docs.map((d) => ({ id: d.id, ...d.data() })))
  );
}

export function docRef<T>(
  database: Firestore,
  ids: Ids
): DocumentReference<T> | null {
  if (!isValid(ids)) {
    return null;
  }

  return doc(database, ids.join("/")) as DocumentReference<T>;
}

export function collectionRef<T>(
  database: Firestore,
  ids: Ids
): CollectionReference<T> | null {
  if (!isValid(ids)) {
    return null;
  }

  return collection(database, ids.join("/")) as CollectionReference<T>;
}

export function useDocRef<T>(
  database: Firestore,
  ids: Ids
): DocumentReference<T> | null {
  const [ref, setRef] = useState<DocumentReference<T> | null>(null);

  useEffect(() => {
    if (!isValid(ids)) {
      setRef(null);
      return;
    }

    setRef(docRef<T>(database, ids));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [database, ...ids]);

  return ref;
}

export function useCollectionRef<T>(
  database: Firestore,
  ids: Ids
): CollectionReference<T> | null {
  const [ref, setRef] = useState<CollectionReference<T> | null>(null);

  useEffect(() => {
    if (!isValid(ids)) {
      setRef(null);
      return;
    }

    setRef(collectionRef(database, ids));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [database, ...ids]);

  return ref;
}

export function useDocData<T>(
  ref: DocumentReference<T> | null
): WithId<T> | null {
  const isMounted = useIsMounted();
  const [data, setData] = useState<WithId<T> | null>(null);

  useEffect(() => {
    if (ref == null || !isMounted) {
      setData(null);
      return;
    }

    return registerDocListener(ref, (data) => {
      if (data === undefined) {
        setData(null);
      } else {
        setData(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.path, isMounted]);

  return data;
}

export function useCollectionData<T>(
  ref: CollectionReference<T> | null
): WithId<T>[] | null {
  return useQueryData(ref);
}

export function useQueryData<T>(query: Query<T> | null): WithId<T>[] | null {
  const isMounted = useIsMounted();
  const [data, setData] = useState<WithId<T>[] | null>(null);

  useEffect(() => {
    if (query == null || !isMounted) {
      setData(null);
      return;
    }

    return registerQueryListener(query, (data) => {
      if (data === undefined) {
        setData(null);
      } else {
        setData(data);
      }
    });
  }, [query, isMounted]);

  return data;
}
