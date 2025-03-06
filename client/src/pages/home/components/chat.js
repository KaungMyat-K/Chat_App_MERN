import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewMessage } from "../../../api/message";
import { hiddenLoader, showLoader } from "../../../redux/loaderSlice";
import toast from "react-hot-toast";

export default function ChatArea() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { selectedChat, user } = useSelector((state) => state.userSlice);
  const selectedUser = selectedChat.members.find(
    (data) => data._id !== user._id
  );
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
      toast.error(res.message);
    }
  };
  return (
    <>
      {selectedChat && (
        <div class="app-chat-area">
          <div class="app-chat-area-header">
            {selectedUser.firstName + " " + selectedUser.lastName}
          </div>
          <div className="main-chat-area">CHAT AREA</div>
          <div class="send-message-div">
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
