import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Role = "student" | "mentor";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextValue {
  user: UserSession | null;
  login: (user: Omit<UserSession, "id">) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "edu-bridge:session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (u) =>
        setUser({ id: crypto.randomUUID(), ...u }),
      logout: () => setUser(null),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
