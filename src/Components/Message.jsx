import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/authContext";
import { ChatContext } from "../Context/ChatContext";
import "./Chat.scss";

const Message = ({ message /*receive props*/, user }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef(); /*The useRef Hook allows you to persist values between renders*/

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  console.log(user);
  return (
    <div
      ref={ref}
      className={`message ${message.senerId === user.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senerId === user.uid
              ? "https://firebasestorage.googleapis.com/v0/b/bystephcommerce.appspot.com/o/moi.png?alt=media&token=e369b0ac-679b-45f2-9fe2-9e27448584c1"
              : "https://firebasestorage.googleapis.com/v0/b/bystephcommerce.appspot.com/o/admin.png?alt=media&token=1f700b44-c787-4ae0-aa80-70123698d66b"
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
