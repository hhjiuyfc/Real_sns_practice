import axios from "axios";
import React, { useEffect, useState } from "react";

import { RightBar } from "../../components/rightbar/RightBar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { TimeLine } from "../../components/timeline/TimeLine";
import { Topbar } from "../../components/topbar/Topbar";
import "./Profile.css";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  // URLのパラメーターを取得(遷移先のコンポーネントで、パラメータを取得します。)
  // App.jsの <Route path="/profile/:username" element={<Profile />}></Route>
  // .usernameでusername取得
  const username = useParams().username;
  console.log(username);
  // 副作用関数を初回レンダリング時の一度だけ実行させたい場合、第2引数に空の依存配列[]を指定します。
  // promiseは待ち状態のためにasync awaitで非同期にuseEffectにはasyncつけれない
  useEffect(() => {
    // 関数作ってasync
    // 投稿したユーザー情報を取得
    const fetchUsers = async () => {
      // 投稿したユーザー情報
      const response = await axios.get(`/users/?username=${username}`);
      console.log(response);
      // responseのdataの中身
      setUser(response.data);
    };
    // "http://localhost:5000/api"は、package.json(backendのposts.jsのタイムラインの投稿を取得のエンドポイント)
    // :userIdはdbのid
    fetchUsers();
  }, []);

  return (
    <>
      <Topbar />

      <div className="profile">
        <Sidebar />

        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user.coverPicture || `${PUBLIC_FOLDER}/post/3.jpeg`}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  `${PUBLIC_FOLDER}${user.profilePicture}` ||
                  `${PUBLIC_FOLDER}/person/noAvatar.png`
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>

              <span className="profileInfoDesc">
                {/* Userスキーマー */}
                {user.desc}
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            {/* DBのusernameと合わせる */}
            <TimeLine username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};
