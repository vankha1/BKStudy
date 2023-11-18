"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const SERVER_URL = "http://localhost:8080";
  const [token, setToken] = useState(localStorage.getItem("JWT"));
  const [isLogin, setIsLogin] = useState(token ? true : false);

  useEffect(() => {
    const fetchUser = () => {
      if (token) {
        if (!userInfo) {
          axios
            .get(SERVER_URL + "/api/v1/user/profile", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if (response.statusText === "OK") {
                setUserInfo(response.data.userInfo);
                localStorage.setItem("userInfo", response.data.userInfo)
              }
              console.log(response);
            })
            .catch((error) => {
              alert(error);
            });
        }
      }
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        userInfo,
        setUserInfo,
        setToken,
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
