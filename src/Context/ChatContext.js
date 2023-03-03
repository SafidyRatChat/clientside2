/*The React Context API is a way for a React app to effectively produce global variables that can be passed around*/
import { useContext, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { createContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";

export const ChatContext = createContext();
export const ChatContextProvider = ({
  children /*represent all our components*/
}) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {}
  };
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid >
            action.payload
              .id /*if currentUser bigger>than user.uid its return:*/
              ? currentUser.uid + action.payload.uid //else
              : action.payload.uid + currentUser.uid
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
