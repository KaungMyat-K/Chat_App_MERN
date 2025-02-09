import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "../../../api/chat";
import toast from "react-hot-toast";
import { hiddenLoader, showLoader } from "../../../redux/loaderSlice";
import { setAllChats } from "../../../redux/userSlice";

export default function Userlist({ searchKey }) {
  const dispatch = useDispatch();
  const {
    allUsers,
    allChats,
    user: currentUser,
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
      }
    } catch (error) {
      dispatch(hiddenLoader());
      toast.error(res.message);
    }
  };

  return allUsers
    .filter((user) => {
      return (
        ((user.firstName?.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.lastName?.toLowerCase().includes(searchKey.toLowerCase())) &&
          searchKey) ||
        allChats.some((chat) => chat.member.includes(user._id))
      );
    })
    .map((user, index) => {
      return (
        <div key={index} class="user-search-filter">
          <div class="filtered-user">
            <div class="filter-user-display">
              {user.profilePic && (
                <img
                  src={user.profilePic}
                  alt="Profile Pic"
                  class="user-profile-image"
                >
                  {" "}
                </img>
              )}
              {!user.profilePic && (
                <div class="user-default-profile-pic">
                  {user?.firstName?.[0] + user?.lastName?.[0]}
                </div>
              )}
              <div class="filter-user-details">
                <div class="user-display-name">
                  {user?.firstName + " " + user?.lastName}
                </div>
                <div class="user-display-email">{user?.email}</div>
              </div>
              {!allChats.find((chat) => chat.member.includes(user._id)) && (
                <div class="user-start-chat">
                  <button
                    onClick={() => startNewChat(user._id)}
                    class="user-start-chat-btn"
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
