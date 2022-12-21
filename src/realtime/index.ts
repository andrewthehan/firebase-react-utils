import {
  Database,
  DatabaseReference,
  DataSnapshot,
  get,
  onValue,
  Query,
  ref,
  Unsubscribe,
} from "firebase/database";
import { useEffect, useState } from "react";
import { isAnyNull, useIsMounted } from "../utils";

type Ids = (string | undefined)[];

export function isValid(ids: Ids): boolean {
  return ids != null && !isAnyNull(...ids);
}

export function checkIsValid(ids: Ids) {
  if (!isValid(ids)) {
    throw new Error(`Invalid ids: ${ids}`);
  }
}

export function getRef(database: Database, ids: Ids): DatabaseReference {
  checkIsValid(ids);
  return ref(database, ids.join("/"));
}

export function registerListener<T>(
  query: Query,
  callback: (t: T) => void
): Unsubscribe {
  const f = (snapshot: DataSnapshot) => callback(snapshot.val() as T);
  return onValue(query, f);
}

export async function exists(ref: DatabaseReference): Promise<boolean> {
  return (await get(ref)).exists();
}

export function useData<T>(query: Query): T | null {
  const isMounted = useIsMounted();
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (ref == null || !isMounted) {
      setData(null);
      return;
    }

    return registerListener(query, (data: T) => {
      if (data === undefined) {
        setData(null);
      } else {
        setData(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, isMounted]);
  return data;
}

export function useIsConnected(database: Database): boolean {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    return registerListener(
      getRef(database, [".info", "connected"]),
      (data: boolean) => {
        setIsConnected(data);
      }
    );
  });

  return isConnected;
}
