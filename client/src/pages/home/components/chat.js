import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewMessage } from "../../../api/message";
import { hiddenLoader, showLoader } from "../../../redux/loaderSlice";
import toast from "react-hot-toast";

export default function ChatArea() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const { selectedChat, user } = useSelector((state) => state.userSlice);
  const selectedUser = selectedChat.members.find(
    (data) => data._id !== user._id
  );

  useEffect(() => {
    getAllMessages();
  }, [selectedChat]);

  const sendMessage = async () => {
    let res = null;
    try {
      const msg = {
        chatId: selectedChat._id,
        sender: user._id,
        text: message,
      };
      dispatch(showLoader());
      res = await createNewMessage(msg);
      dispatch(hiddenLoader());
      if (res.success) {
        setMessage("");
      }
    } catch (error) {
      dispatch(hiddenLoader());
      toast.error(error.message);
    }
  };
  const getAllMessages = async () => {
    let res = null;
    try {
      dispatch(showLoader());
      res = await getAllMessages(selectedChat._id);
      dispatch(hiddenLoader());
      if (res.success) {
        setAllMessages(res.data);
      }
    } catch (error) {
      dispatch(hiddenLoader());
      toast.error(error.message);
    }
  };

  console.log("msg >>> ", selectedChat._id);

  return (
    <>
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {selectedUser.firstName + " " + selectedUser.lastName}
          </div>
          <div className="main-chat-area">
            {allMessages.map((data) => {
              const isCurrentUser = data.sender === user._id;
              return (
                <div
                  className="message-container"
                  style={
                    isCurrentUser
                      ? { justifyContent: "end" }
                      : { justifyContent: "start" }
                  }
                >
                  <div
                    className={
                      isCurrentUser ? "send-message" : "received-message"
                    }
                  >
                    {data.text}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="send-message-div">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              className="send-message-input"
              placeholder="Type a message"
            />
            <button
              onClick={() => sendMessage()}
              className="fa fa-paper-plane send-message-btn"
              aria-hidden="true"
            ></button>
          </div>
        </div>
      )}
    </>
  );
}
