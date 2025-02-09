import React from "react";
import { useSelector } from "react-redux";

export default function Userlist({ searchKey }) {
  const { allUsers } = useSelector((state) => state.userSlice);

  return allUsers
    .filter((user) => {
      return (
        (user.firstName?.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.lastName?.toLowerCase().includes(searchKey.toLowerCase())) &&
        searchKey
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
              <div class="user-start-chat">
                <button class="user-start-chat-btn">Start Chat</button>
              </div>
            </div>
          </div>
        </div>
      );
    });
}
