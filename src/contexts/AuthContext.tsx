import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import type { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  role: string | null;
  branchCity: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  branchCity: null,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [branchCity, setBranchCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if(firebaseUser) {
        const tokenResult = await firebaseUser.getIdTokenResult(true);
        setRole(String(tokenResult.claims.role) ?? null);
        setBranchCity(String(tokenResult.claims.branchCity) ?? null);
      } else {
        setRole(null)
        setBranchCity(null)
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, branchCity }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = (): AuthContextType => useContext(AuthContext);
