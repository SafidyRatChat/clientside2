import React, { useRef, useState, useEffect, useContext } from "react";
import "./Chat.scss";
import firebase from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  onSnapshot,
  getFirestore,
  getDoc,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import db from "../firebase";
import { BiArrowToBottom } from "react-icons/bi";
import { ChatContext } from "../Context/ChatContext";
import Message from "./Message";
import { AuthContext } from "../Context/authContext";

const Chat = ({ user, setChat, chat }) => {
  const [messages, setMessages] = useState([]);
  console.log(messages);

  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);

  /*const combinedId =
  
    ? currentUser.uid + user.uid //else
    : user.uid + currentUser.uid;*/
  const Chatid = user.uid + "hT08IGZpCZTkmCHs8b7Gj9OOzKy2";
  /*useEffect(() => {
    //const db = firebase.firestore();
    const unsubscribe = db
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    return () => {
      unsubscribe();
    };
  }, []);*/
  //////check chat at first msg

  useEffect(() => {
    const unSub = onSnapshot(doc(getFirestore(), "chats", Chatid), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [Chatid]);

  const handleClose = async () => {
    const docRef = doc(
      getFirestore() /*initialisation*/,
      "chats" /*collection name*/,
      Chatid /*unique ID*/
    );
    await getDoc(docRef).then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (data.messages && data.messages.length === 1) {
          deleteDoc(docRef);
        }
      }
    });
    setChat(false);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    ///if chat collection
    //////////////
    await updateDoc(doc(getFirestore(), "chats", Chatid), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senerId: user.uid,
        date: Timestamp.now()
      })
    });
    await updateDoc(
      doc(getFirestore(), "userChats", "hT08IGZpCZTkmCHs8b7Gj9OOzKy2"),
      {
        [Chatid + ".lastMessage"]: {
          text
        },
        [Chatid + ".date"]: serverTimestamp()
      }
    );

    await updateDoc(
      doc(getFirestore(), "userChats", "hT08IGZpCZTkmCHs8b7Gj9OOzKy2"),
      {
        [Chatid + ".userInfo"]: {
          uid: user.uid,
          displayName: user.uid,
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/bystephcommerce.appspot.com/o/client.png?alt=media&token=0276d4cd-8696-4091-a96a-03b6fa146574"
        },
        [Chatid +
        ".date"]: serverTimestamp() /*acess time for differnt time zones*/
      }
    );
    setText("");
  };

  return (
    <div
      className="chat"
      style={{
        transition: "height 0.3s ease",
        height: chat ? "500px" : "0px",
        overflow: chat ? "visible" : "hidden"
      }}
    >
      <h3>
        <BiArrowToBottom onClick={handleClose} className="close" />
      </h3>
      <div className="message-container">
        <div className="messages vertical_overflow">
          {messages &&
            messages.map((m) => (
              <Message
                message={m /*send prop*/}
                key={m.id /*must give unique key*/}
                user={user}
              />
            ))}
        </div>
      </div>
      <form className="message-form" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
