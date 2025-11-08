// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const email = firebaseUser.email || "";
        let role = "user";

        //  Detect role automatically based on email pattern
        if (email.includes("admin")) role = "admin";
        else if (email.includes("host")) role = "host";

        // Save role in localStorage for persistence
        localStorage.setItem(`role_${firebaseUser.uid}`, role);

        setUser({
          uid: firebaseUser.uid,
          email,
          role,
        });
      } else {
        setUser(null);
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ SIGNUP — only normal users allowed
  const signup = async (email, password) => {
    try {
      // ❌ Block Admins & Hosts from signing up
      if (email.includes("admin") || email.includes("host")) {
        return { ok: false, message: "Admins and Hosts cannot sign up. Please login instead." };
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Default role = user
      localStorage.setItem(`role_${newUser.uid}`, "user");
      setUser({ uid: newUser.uid, email: newUser.email, role: "user" });

      return { ok: true, user: newUser };
    } catch (err) {
      return { ok: false, message: err.message || "Signup failed" };
    }
  };

  // ✅ LOGIN — detects role automatically
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      // Auto-detect role from email
      let role = "user";
      if (email.includes("admin")) role = "admin";
      else if (email.includes("host")) role = "host";

      localStorage.setItem(`role_${loggedInUser.uid}`, role);
      setUser({ uid: loggedInUser.uid, email: loggedInUser.email, role });

      return { ok: true, user: loggedInUser };
    } catch (err) {
      return { ok: false, message: err.message || "Login failed" };
    }
  };

  // ✅ LOGOUT
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err.message || "Logout failed" };
    }
  };

  // ✅ PASSWORD RESET
  const sendReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err.message || "Failed to send reset email" };
    }
  };

  // ✅ MANUALLY CHANGE ROLE (optional helper)
  const setRole = (role) => {
    if (user) {
      localStorage.setItem(`role_${user.uid}`, role);
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
        signup,
        login,
        logout,
        sendReset,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
