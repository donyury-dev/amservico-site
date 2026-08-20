"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  changePassword: (current: string, next: string) => Promise<boolean>;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

const COOKIE_NAME = "am_admin_auth";
const PASSWORD_KEY = "am_admin_password_hash";
const DEFAULT_PASSWORD = "admin123";

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getStoredHash(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PASSWORD_KEY);
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const auth = Cookies.get(COOKIE_NAME);
    if (auth === "1") setIsAuthenticated(true);
    setReady(true);
  }, []);

  const login = async (password: string) => {
    const stored = getStoredHash();
    const inputHash = await sha256(password);
    const defaultHash = await sha256(DEFAULT_PASSWORD);
    const validHash = stored || defaultHash;
    if (inputHash === validHash) {
      Cookies.set(COOKIE_NAME, "1", { expires: 7, sameSite: "strict" });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const changePassword = async (current: string, next: string) => {
    const ok = await login(current);
    if (!ok) return false;
    localStorage.setItem(PASSWORD_KEY, await sha256(next));
    return true;
  };

  const logout = () => {
    Cookies.remove(COOKIE_NAME);
    setIsAuthenticated(false);
  };

  if (!ready) return null;

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, changePassword }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
