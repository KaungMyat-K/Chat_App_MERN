import React from "react";
import Header from "./components/header";
import ChatArea from "./components/chat";
import { useSelector } from "react-redux";
import Sidebar from "./components/sidebar";

export default function Home() {
  const { selectedChat } = useSelector((state) => state.userSlice);

  return (
    <div className="home-page">
      <Header></Header>
      <div className="main-content">
        <Sidebar></Sidebar>
        {selectedChat && <ChatArea></ChatArea>}
      </div>
    </div>
  );
}
