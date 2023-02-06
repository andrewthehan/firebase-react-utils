import {
  deleteUser as fDeleteUser,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged as fOnAuthStateChanged,
  signInAnonymously as fSignInAnonymously,
  signInWithPopup as fSignInWithPopup,
  signOut as fSignOut,
  Unsubscribe,
  User,
  UserCredential,
} from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { useIsMounted } from "../utils";

export function onUserChange(
  callback: (user: User | null) => void
): Unsubscribe {
  return fOnAuthStateChanged(getAuth(), callback);
}

export function getCurrentUser(): User | null {
  return getAuth().currentUser;
}

export async function signInAnonymously(): Promise<UserCredential> {
  return await fSignInAnonymously(getAuth());
}

export async function signInWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  return await fSignInWithPopup(getAuth(), provider);
}

export async function signOut(): Promise<void> {
  return await fSignOut(getAuth());
}

export async function deleteCurrentUser(): Promise<void> {
  const user = getCurrentUser();
  if (user == null) {
    return;
  }

  return await fDeleteUser(user);
}

export function useCurrentUser(): [User | null | undefined, boolean] {
  const isMounted = useIsMounted();
  const [currentUser, setCurrentUser] = useState<User | null>();

  // undefined == not loaded
  // null == loaded but no auth
  // some value == loaded and auth
  const loaded = useMemo(() => currentUser !== undefined, [currentUser]);

  useEffect(() => {
    return onUserChange((user) => {
      if (!isMounted) {
        return;
      }

      setCurrentUser(user);
    });
  });

  return [currentUser, loaded];
}

export function useIsOwner(userId: string): boolean {
  const [currentUser, loaded] = useCurrentUser();

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (userId == null || !loaded || currentUser == null) {
      setIsOwner(false);
      return;
    }

    setIsOwner(currentUser.uid === userId);
  }, [currentUser, userId]);

  return isOwner;
}
