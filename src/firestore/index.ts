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
  function f(): DocumentReference<T> | null {
    if (!isValid(ids)) {
      return null;
    }

    return docRef<T>(database, ids);
  }

  const [ref, setRef] = useState<DocumentReference<T> | null>(f);

  useEffect(
    () => setRef(f()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [database, ...ids]
  );

  return ref;
}

export function useCollectionRef<T>(
  database: Firestore,
  ids: Ids
): CollectionReference<T> | null {
  function f(): CollectionReference<T> | null {
    if (!isValid(ids)) {
      return null;
    }

    return collectionRef(database, ids);
  }

  const [ref, setRef] = useState<CollectionReference<T> | null>(f);

  useEffect(
    () => setRef(f()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [database, ...ids]
  );

  return ref;
}

export function useDocData<T>(
  ref: DocumentReference<T> | null
): [WithId<T> | null, boolean] {
  const isMounted = useIsMounted();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<WithId<T> | null>(null);

  useEffect(() => {
    if (ref == null || !isMounted) {
      setLoaded(false);
      setData(null);
      return;
    }

    return registerDocListener(ref, (newData) => {
      if (newData === undefined) {
        setData(null);
      } else {
        setData(newData);
      }
      setLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.path, isMounted]);

  return [data, loaded];
}

export function useCollectionData<T>(
  ref: CollectionReference<T> | null
): [WithId<T>[], boolean] {
  return useQueryData(ref);
}

export function useQueryData<T>(
  query: Query<T> | null
): [WithId<T>[], boolean] {
  const isMounted = useIsMounted();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<WithId<T>[]>([]);

  useEffect(() => {
    if (query == null || !isMounted) {
      setLoaded(false);
      setData([]);
      return;
    }

    return registerQueryListener(query, (newData) => {
      if (newData === undefined) {
        setData([]);
      } else {
        setData(newData);
      }
      setLoaded(true);
    });
  }, [query, isMounted]);

  return [data, loaded];
}
