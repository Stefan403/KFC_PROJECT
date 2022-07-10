import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({});
const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }) => {
  let user=JSON.parse(localStorage.getItem("user"));



  
const signIn = (resultUser, token) => {
   localStorage.setItem('user', resultUser);
   localStorage.setItem('token', token);
   return;
    }

 const signOut = () => {
  if (localStorage.getItem("user")){
  localStorage.removeItem("user");
  return;
  }
}

const getUser = () => {
   return JSON.parse(localStorage.getItem("user"))
}
 
  return (
    <AuthContext.Provider value={{ signOut, signIn , getUser, user}}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthContext, AuthProvider };
