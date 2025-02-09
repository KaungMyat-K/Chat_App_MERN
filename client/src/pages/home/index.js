import React from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

export default function Home() {
  return (
    <div className="home-page">
      <Header></Header>
      <div className="main-content">
        <Sidebar></Sidebar>
      </div>
    </div>
  );
}
