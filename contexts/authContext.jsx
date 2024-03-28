import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [newUserId, setNewUserId] = useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const login = async (email, password) => {
    try {
    } catch (e) {}
  };

  const logout = async () => {
    try {
    } catch (e) {}
  };

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setNewUserId(response?.user.uid)

      return { success: true, data: response?.user };
    } catch (e) {
      let msg = e.message;
      if(msg.includes('(auth/invalid-email')) msg='Invalid email'
      return { success: false, msg};
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, newUserId, setIsAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth mustbe wrapped inside AuthContextProvider");
  }
  return value;
};
