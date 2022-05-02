import React, { useState, useEffect, useContext } from "react";
import { Post } from "../post/Post";
import { Share } from "../share/Share";
import "./TimeLine.css";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

// import { Posts } from "../../dummyData";

export const TimeLine = ({ username }) => {
  const { user } = useContext(AuthContext);
  // 自分の投稿とフォローしているひとの投稿
  const [posts, setPosts] = useState([]);
  // 副作用関数を初回レンダリング時の一度だけ実行させたい場合、第2引数に空の依存配列[]を指定します。
  // promiseは待ち状態のためにasync awaitで非同期にuseEffectにはasyncつけれない
  useEffect(() => {
    // 関数作ってasync
    const fetchPosts = async () => {
      // プロフィール画面では自分が投稿した投稿のみ表示(usernameが存在するなら)
      const response = username
        ? await axios.get(`/posts/profile/${username}`) // プロフィールの場合
        : // _idはDBの
          await axios.get(`/posts/timeline/${user._id}`); // Homeの場合
      // ホーム画面では自分とフォローしているユーザーの投稿表示
      // console.log(response);
      // responseのdataの中身
      setPosts(response.data);
    };
    // "http://localhost:5000/api"は、package.json(backendのposts.jsのタイムラインの投稿を取得のエンドポイント)
    // :userIdはdbのid
    fetchPosts();
    // username、 user._idが更新するたびにレンダリングされる(axios.get)
  }, [username, user._id]);
  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          // MongoDBの_id
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};
