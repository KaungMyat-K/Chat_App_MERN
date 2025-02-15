import React from "react";
import { useSelector } from "react-redux";

export default function ChatArea() {
  const { selectedChat, user } = useSelector((state) => state.userSlice);
  const selectedUser = selectedChat.members.find(
    (data) => data._id !== user._id
  );
  return (
    <>
      {selectedChat && (
        <div class="app-chat-area">
          <div class="app-chat-area-header">
            {selectedUser.firstName + " " + selectedChat.lastName}
          </div>
          <div>CHAT AREA</div>
          <div>SEND MESSAGE</div>
        </div>
      )}
    </>
  );
}
