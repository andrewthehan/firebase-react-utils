import { useEffect, useState } from "react";
import { isAnyNull, useIsMounted } from "../Utils";
import { registerListener } from "./RealtimeStore";

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

export function useIsConnected(database) {
  const [isConnected, setIsConnected] = useState();

  useEffect(() => {
    return registerListener(database, [".info", "connected"], (data) => {
      setIsConnected(data);
    });
  });

  return isConnected;
}
