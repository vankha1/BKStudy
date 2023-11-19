"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const SERVER_URL = "http://localhost:8080";
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("JWT")) {
      setIsLogin(true)
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        SERVER_URL,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export const ProtectedRoute = ({ children }) => {
  const { isLogin } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!isLogin && pathname !== "/login") {
      router.push("/login");
    }
  }, []);
  return children;
};
