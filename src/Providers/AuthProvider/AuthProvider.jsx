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
import useAxiospublic from "../../Hooks/useAxiospublic";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [laoding, setLoading] = useState(true);
  const axiosPublic = useAxiospublic();
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
      if (currentuser) {
        const userInfo = {
          email: currentuser?.email,
        };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          // console.log(res.data.token);

          if (res.data.token) {
            localStorage.setItem("authToken", res.data.token);
          }
          // fetchProtectedData()
        });
      } else {
        localStorage.removeItem("authToken");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);
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
