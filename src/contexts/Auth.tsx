import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextProps = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

// Criando obj do context
export const AuthContext = createContext({} as AuthContextProps);


export function AuthContextProver(prosp: AuthContextProviderProps) {

  const [user, setUser] = useState<User>();
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    //vrificando se o usuario esta logado
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
        // setLoading(false);
      }
    })

    return () => {
      unsubscribe();
    }
  }, []);

  async function signInWithGoogle() {
    //Autenticação do usuario com Firebase para
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  // if (loading) return <h1>Carregando</h1>;
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {prosp.children}
    </AuthContext.Provider>

  )
}