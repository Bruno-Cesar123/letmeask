import { createContext, ReactNode, useState, useEffect } from 'react';

import { auth, firebase } from '../services/Firebase';

type User = {
  id: string;
  name: string;
  avatar: string | null;
}

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, []);

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);


    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName) {
        throw new Error('Missing information from Google Account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  async function signOut() {
    await auth.signOut();
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, singInWithGoogle, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}