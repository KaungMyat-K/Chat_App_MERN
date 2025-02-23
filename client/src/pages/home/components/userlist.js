import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "../../../api/chat";
import toast from "react-hot-toast";
import { hiddenLoader, showLoader } from "../../../redux/loaderSlice";
import { setAllChats, setSelectedChat } from "../../../redux/userSlice";

export default function Userlist({ searchKey }) {
  const dispatch = useDispatch();
  const {
    allUsers,
    allChats,
    user: currentUser,
    selectedChat,
  } = useSelector((state) => state.userSlice);

  const startNewChat = async (searchedUserId) => {
    let res = null;
    try {
      dispatch(showLoader());
      res = await createNewChat([currentUser._id, searchedUserId]);
      dispatch(hiddenLoader());
      if (res.success) {
        toast.success(res.message);
        const newChat = res.data;
        const updateChat = [...allChats, newChat];
        dispatch(setAllChats(updateChat));
        dispatch(setSelectedChat(newChat));
      }
    } catch (error) {
      dispatch(hiddenLoader());
      toast.error(res.message);
    }
  };

  const openChat = (selectedUser) => {
    const chat = allChats.find(
      (data) =>
        data.members.map((data) => data._id).includes(currentUser._id) &&
        data.members.map((data) => data._id).includes(selectedUser)
    );
    if (chat) {
      dispatch(setSelectedChat(chat));
    }
  };

  const isSelectedChat = (user) => {
    if (selectedChat) {
      return selectedChat.members.map((data) => data._id).includes(user._id);
    }
    return false;
  };

  return allUsers
    .filter((user) => {
      return (
        ((user.firstName?.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.lastName?.toLowerCase().includes(searchKey.toLowerCase())) &&
          searchKey) ||
        allChats.some((chat) =>
          chat.members.map((data) => data._id).includes(user._id)
        )
      );
    })
    .map((user, index) => {
      return (
        <div
          onClick={() => openChat(user._id)}
          key={index}
          class="user-search-filter"
        >
          <div
            className={isSelectedChat(user) ? "selected-user" : "filtered-user"}
          >
            <div className="filter-user-display">
              {user.profilePic && (
                <img
                  src={user.profilePic}
                  alt="Profile Pic"
                  className={
                    isSelectedChat(user)
                      ? "user-selected-avatar"
                      : "user-default-avatar"
                  }
                >
                  {" "}
                </img>
              )}
              {!user.profilePic && (
                <div className="user-default-avatar">
                  {user?.firstName?.[0] + user?.lastName?.[0]}
                </div>
              )}
              <div className="filter-user-details">
                <div className="user-display-name">
                  {user?.firstName + " " + user?.lastName}
                </div>
                <div className="user-display-email">{user?.email}</div>
              </div>
              {!allChats.find((chat) =>
                chat.members.map((data) => data._id).includes(user._id)
              ) && (
                <div className="user-start-chat">
                  <button
                    onClick={() => startNewChat(user._id)}
                    className="user-start-chat-btn"
                  >
                    Start Chat
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
}
