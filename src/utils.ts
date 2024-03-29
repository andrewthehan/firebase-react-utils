import { useEffect, useRef } from "react";

export function isAnyNull(...args: any[]): boolean {
  return args.findIndex((x) => x == null) !== -1;
}

export function useIsMounted(): boolean {
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted.current;
}
