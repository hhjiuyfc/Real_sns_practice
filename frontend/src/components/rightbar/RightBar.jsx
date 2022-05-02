import React from "react";
import { Online } from "../online/Online";
import "./Rightbar.css";
import { Users } from "../../dummyData";

export const RightBar = ({ profile, user }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  // homeコンポーネント
  const HomeRightBar = () => {
    return (
      <>
        <div className="eventContainer">
          <img
            src={`${process.env.PUBLIC_URL}assets/star.png`}
            alt=""
            className="startImg"
          />
          <span className="eventText">
            {/* bタグ(太く) */}
            <b>フォロワーイベント開催中!</b>
          </span>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}assets/event.jpeg`}
          alt=""
          className="eventImg"
        />
        <h4 className="rightBarTitle">オンラインの友達</h4>
        {Users.map((user) => (
          <Online user={user} key={user.id} />
        ))}

        <ul className="rightBarFriendList"></ul>
        <p className="promotionTitle">プロモーション広告</p>
        <img
          src={`${PUBLIC_FOLDER}/promotion/promotion1.jpeg`}
          alt=""
          className="rightBarPromotionImg"
        />
        <p className="promotionName">ショッピング</p>

        <img
          src={`${PUBLIC_FOLDER}/promotion/promotion2.jpeg`}
          alt=""
          className="rightBarPromotionImg"
        />
        <p className="promotionName">カーショップ</p>

        <img
          src={`${PUBLIC_FOLDER}/promotion/promotion3.jpeg`}
          alt=""
          className="rightBarPromotionImg"
        />
        <p className="promotionName">ShinCode株式会社</p>
      </>
    );
  };
  // profile関数コンポーネント
  const ProfileRightBar = () => {
    return (
      <>
        <h4 className="">ユーザー情報</h4>
        <div className="rightBarInfo">
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">出身:</span>
            <span className="rightBarInfoKey">福岡:</span>
          </div>
          <h4 className="rightBarTitle">あなたの友達</h4>
          <div className="rightBarFollowings">
            <div className="rightBarFollowing">
              <img
                src={`${PUBLIC_FOLDER}/person/1.jpeg`}
                alt=""
                className="rightBarFollowingImg"
              />
              <span className="rightBarFollowingName">Hiroyuki</span>
            </div>
            <div className="rightBarFollowing">
              <img
                src={`${PUBLIC_FOLDER}/person/2.jpeg`}
                alt=""
                className="rightBarFollowingImg"
              />
              <span className="rightBarFollowingName">Tanaka</span>
            </div>
            <div className="rightBarFollowing">
              <img
                src={`${PUBLIC_FOLDER}/person/3.jpeg`}
                alt=""
                className="rightBarFollowingImg"
              />
              <span className="rightBarFollowingName">Yamaki</span>
            </div>
            <div className="rightBarFollowing">
              <img
                src={`${PUBLIC_FOLDER}/person/4.jpeg`}
                alt=""
                className="rightBarFollowingImg"
              />
              <span className="rightBarFollowingName">Koga</span>
            </div>
            <div className="rightBarFollowing">
              <img
                src={`${PUBLIC_FOLDER}/person/5.jpeg`}
                alt=""
                className="rightBarFollowingImg"
              />
              <span className="rightBarFollowingName">Matukubo</span>
            </div>
          </div>
        </div>
      </>
    );
  };
  // 共通のもの
  return (
    <div className="rightbar">
      <div className="rightBarWrapper">
        {/* userが存在したらProfile画面 */}
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};
