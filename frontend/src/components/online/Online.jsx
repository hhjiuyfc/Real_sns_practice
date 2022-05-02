import React from "react";

export const Online = ({ user }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightBarFriend">
      <div className="rightBarProfileImgContainer">
        <img
          src={`${PUBLIC_FOLDER}${user.profilePicture}`}
          alt=""
          className="rightBarProfileImg"
        />
        <span className="rightBarOnline"></span>
      </div>
      <span className="rightBarUserName">{user.username}</span>
    </li>
  );
};
