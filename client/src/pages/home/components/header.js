import React from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Quick Chat
      </div>
      <div className="app-user-profile">
        <div className="logged-user-name">
          {user?.firstName + " " + user?.lastName}
        </div>
        <div className="logged-user-profile-pic">
          {user?.firstName?.[0] + user?.lastName?.[0]}
        </div>
      </div>
    </div>
  );
}
