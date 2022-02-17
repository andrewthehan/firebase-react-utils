import { useEffect, useState } from "react";
import { registerListener } from "./FirestoreStore";
import { isAnyNull, useIsMounted } from "../Utils";

export function useData(database, ids) {
  const isMounted = useIsMounted();
  const [data, setData] = useState();

  useEffect(() => {
    if (isAnyNull(...ids)) {
      setData(null);
      return;
    }

    return registerListener(database, ids, (data) => {
      if (!isMounted) {
        return;
      }

      setData(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...ids, isMounted]);
  return data;
}
