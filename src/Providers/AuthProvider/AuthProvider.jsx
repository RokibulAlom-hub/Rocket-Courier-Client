import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [laoding, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  // user creation function
  const createUserByemail = (email, password, displayName, photoURL) => {
    return createUserWithEmailAndPassword(
      auth,
      email,
      password,
      displayName,
      photoURL
    );
  };
  // google login
  const googlelogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // user login function
  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // user logout function
  const userLogout = () => {
    return signOut(auth);
  };
  // update user
  const updateUserData = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };
  // observer settings
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("observer is watching you", currentuser);
      setUser(currentuser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authData = {
    createUserByemail,
    userLogin,
    userLogout,
    updateUserData,
    setUser,
    googlelogin,
    user,
    laoding,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
