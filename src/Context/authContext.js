/*The React Context API is a way for a React app to effectively produce global variables that can be passed around*/
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({
  children /*represent all our components*/
}) => {
  const [currentUser, setCurrentUser] = useState({});

  /* By using  useEffect: 
  you tell React that your component needs to do something after render*/

  useEffect(() => {
    //check is user is connected or not affter render
    const unsub =onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });
return()=>{/*we should do this when using realtime fuction*/
  unsub();
}

  }, []);
  return(<AuthContext.Provider value={{currentUser}}>
    {children}
  </AuthContext.Provider>)

};

