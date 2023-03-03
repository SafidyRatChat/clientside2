import React, { useEffect, useState } from "react";
import Headbar from "./Components/Headbar";
import ProductList from "./Components/ProductList";
import Chat from "./Components/Chat";
import Footer from "./Components/Footer";
import "./App.scss";
import { v4 as uuid } from "uuid";
import { auth, db } from "./firebase";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  updateDoc,
  arrayUnion,
  Timestamp
} from "firebase/firestore";
import Lottie from "react-lottie";
import animationData from "./lottie/chat.json";
import ProductCard from "./Components/ProductCard";
import Selected from "./Components/Selected";

const App = () => {
  const [err, setErr] = useState(false);
  const [chat, setChat] = useState(false);
  const [chatbutton, SetChatbutton] = useState("visible");

  /////render reponsive
  const [shouldRender, setShouldRender] = useState(false);
  const [product, SetProduct] = useState(null);

  const [selested, SetSelected] = useState("none");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        if (!chat) {
          setShouldRender(true);
        } else {
          setShouldRender(false);
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [chat]);

  useEffect(() => {
    if (chat) {
      SetChatbutton("hidden");
    } else {
      SetChatbutton("visible");
    }
  }, [chat]);

  // Get the user ID from local storage
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);

  const handleSignIn = (user) => {
    setUser(user);
  };

  const handleSignOut = () => {
    setUser(null);
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  const handleChat = () => {
    const login = async () => {
      signInAnonymously(auth)
        .then(() => {
          //console.log("logged");
          // Signed in..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        });
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(
          db /*initialisation*/,
          "users" /*collection name*/,
          user.uid /*unique ID*/
        );

        getDoc(docRef).then((docSnap) => {
          //console.log(user);
          setUser(user);
          if (!docSnap.exists()) {
            setDoc(docRef, {
              uid: user.uid,
              displayName: user.uid,
              phone: "",
              email: "",
              photoURL:
                "https://firebasestorage.googleapis.com/v0/b/bystephcommerce.appspot.com/o/client.png?alt=media&token=0276d4cd-8696-4091-a96a-03b6fa146574"

              // add any data you want to set here
            });
          }
        });
        ////////////////////////
        const docUserChat = doc(
          getFirestore() /*initialisation*/,
          "userChats" /*collection name*/,
          user.uid /*unique ID*/
        );
        const Chatid = user.uid + "hT08IGZpCZTkmCHs8b7Gj9OOzKy2";

        getDoc(docUserChat).then((docS) => {
          //console.log(user);
          setUser(user);
          if (!docS.exists()) {
            setDoc(docUserChat, {
              // add any data you want to set here
            });
          }
        });

        const docChat = doc(
          getFirestore() /*initialisation*/,
          "chats" /*collection name*/,
          Chatid /*unique ID*/
        );

        getDoc(docChat).then((docS) => {
          if (!docS.exists()) {
            setDoc(docChat, {
              // add any data you want to set here
            }).then(() => {
              updateDoc(doc(getFirestore(), "chats", Chatid), {
                messages: arrayUnion({
                  id: uuid(),
                  text: "Bonjour, je peux vous aider, inona no azo atao anao",
                  senerId: "hT08IGZpCZTkmCHs8b7Gj9OOzKy2",
                  date: Timestamp.now()
                })
              });
            });
          }
        });

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    login();

    setChat(true);
  };

  const handleclose = () => {
    SetSelected("none");
  };

  return (
    <div className="app">
      {product && (
        <div className="selected" style={{ display: `${selested}` }}>
          <div className="head">
            <div onClick={handleclose} className="closebutton">
              {" "}
              X{" "}
            </div>
          </div>
          <div className="content">
            {product && <Selected product={product} />}
          </div>
        </div>
      )}

      {
        <Headbar
          SetProduct={SetProduct}
          SetSelected={SetSelected}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          user={user}
        />
      }
      <div className="product-chat">
        {<ProductList SetProduct={SetProduct} SetSelected={SetSelected} />}
        {user && <Chat user={user} setChat={setChat} chat={chat} />}
      </div>
      <div onClick={handleChat} className="chatbutton">
        <Lottie
          style={{ visibility: { chatbutton } }}
          options={defaultOptions}
          height={80}
          width={80}
        />
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
