import { Chat, Notifications, Search } from "@mui/icons-material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";
import { AuthContext } from "../../state/AuthContext";

export const Topbar = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  // グローバルステートのuserを使う
  const { user } = useContext(AuthContext);
  return (
    <div className="topBarContainer">
      <div className="topBarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Real SNS</span>
        </Link>
      </div>
      <div className="topBarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="探し物はなんですか?"
          />
        </div>
      </div>
      <div className="topBarRight">
        <div className="topBarIcon">
          <div className="topBarIconItem">
            <Chat />
            <span className="topBarIconBadge">1</span>
          </div>
          <div className="topBarIconItem">
            <Notifications />
            <span className="topBarIconBadge">2</span>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? `${PUBLIC_FOLDER}${user.profilePicture}`
                  : `${PUBLIC_FOLDER}/person/noAvatar.png`
              }
              alt=""
              className="topBarImg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
