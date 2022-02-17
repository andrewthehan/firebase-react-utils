import { useEffect, useState } from "react";
import { onUserChange } from "./Firebase";
import { isAnyNull, useIsMounted } from "./Utils";

export function useCurrentUser() {
  const isMounted = useIsMounted();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    return onUserChange((user) => {
      if (!isMounted) {
        return;
      }

      setCurrentUser(user);
    });
  });

  return currentUser;
}

export function useIsOwner(userId) {
  const currentUser = useCurrentUser();

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (isAnyNull(userId, currentUser)) {
      setIsOwner(false);
      return;
    }

    setIsOwner(currentUser.uid === userId);
  }, [currentUser, userId]);

  return isOwner;
}
