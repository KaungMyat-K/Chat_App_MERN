import React, { useState } from "react";
import Search from "./search";
import Userlist from "./userlist";

export default function Sidebar() {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="app-sidebar">
      <Search searchKey={searchKey} setSearchKey={setSearchKey}></Search>
      <Userlist searchKey={searchKey}></Userlist>
    </div>
  );
}
