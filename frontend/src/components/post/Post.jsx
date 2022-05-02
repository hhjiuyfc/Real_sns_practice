import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "./Post.css";
// import { Users } from "../../dummyData";
// "" スペースないように
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

export const Post = ({ post }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  // いいね!の数の状態変数(ダミーデータ)
  // PostスキーマーのlikesのArray
  const [like, setLike] = useState(post.likes.length);
  // 押されているかの状態変数
  const [isLiked, setIsLiked] = useState(false);
  // 投稿したuserId
  const [user, setUser] = useState({});

  const { user: currentUser } = useContext(AuthContext);
  // 副作用関数を初回レンダリング時の一度だけ実行させたい場合、第2引数に空の依存配列[]を指定します。
  // promiseは待ち状態のためにasync awaitで非同期にuseEffectにはasyncつけれない
  useEffect(() => {
    // 関数作ってasync
    // 投稿したユーザー情報を取得
    const fetchUsers = async () => {
      // 投稿したユーザー情報
      const response = await axios.get(`/users?userId=${post.userId}`);
      // console.log(response);
      // responseのdataの中身
      setUser(response.data);
    };
    // "http://localhost:5000/api"は、package.json(backendのposts.jsのタイムラインの投稿を取得のエンドポイント)
    // :userIdはdbのid
    fetchUsers();
  }, [post.userId]);

  const handleLike = async () => {
    try {
      //いいねのAPIを叩く(誰がログインしていてどの投稿にいいね!をしたのか)_id(DB)
      /* / スラッシュ忘れないように*/
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    // 押されているならいいねを解除(-1), 押されてないのなら+1
    setLike(isLiked ? like - 1 : like + 1);
    // falseならtrue trueならfalse(押されているならfalse 押されてないならtrue)
    setIsLiked(!isLiked);
  };
  // ダミーデータのidと一致したのを残す
  // const user = Users.filter((user) => user.id === 1);
  // console.log(user[0].username);
  return (
    <div className="post">
      {/* 内側外側の余白を調整 */}
      <div className="postWrapper">
        {/* Top right center bottom */}
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                // backendのUserスキーマー
                src={
                  user.profilePicture
                    ? `${PUBLIC_FOLDER}${user.profilePicture}`
                    : `${PUBLIC_FOLDER}/person/noAvatar.png`
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">
              {/* filter() メソッドは、与えられた関数によって実装されたテストに合格したすべての配列(１個なら[0], 2個なら[0, 1])からなる新しい配列を生成します */}
              {/* ダミーデータのUsersのidとPostsのidが等しいusernameの配列[0] */}
              {user.username}
            </span>
            {/* 現在の時刻からの差分(何時間前何分前の投稿か?) */}
            <span className="postData">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>

          <img src={`${PUBLIC_FOLDER}${post.img}`} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PUBLIC_FOLDER}/heart.png`}
              alt=""
              className="likeIcon"
              onClick={() => handleLike()}
            />

            <span className="postLikeCounter">{like}人がいいねしました</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}:コメント</span>
          </div>
        </div>
      </div>
    </div>
  );
};
