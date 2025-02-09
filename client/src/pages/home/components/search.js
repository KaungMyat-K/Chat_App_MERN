import React from "react";

export default function Search({ searchKey, setSearchKey }) {
  return (
    <div className="user-search-area">
      <input
        onChange={(e) => setSearchKey(e.target.value)}
        value={searchKey}
        type="text"
        className="user-search-text"
      />
      <i className="fa fa-search user-search-btn" aria-hidden="true"></i>
    </div>
  );
}
