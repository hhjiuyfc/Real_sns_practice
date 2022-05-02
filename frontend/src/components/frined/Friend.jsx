import React from "react";

export const Friend = ({ user }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img
        // スペース空けないように(テンプレート文字列)
        src={`${PUBLIC_FOLDER}${user.profilePicture}`}
        alt=""
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};
