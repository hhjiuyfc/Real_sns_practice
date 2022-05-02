import {
  AlternateEmail,
  Analytics,
  Face,
  Gif,
  Image,
} from "@mui/icons-material";

import React, { useContext, useRef, useState } from "react";
import "./Share.css";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";

export const Share = () => {
  const [file, setFile] = useState(null);
  console.log(file);
  // const [inputValue, setInputValue] = useState("");
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  // useRef() onChangより再レンダリング少ない
  const desc = useRef();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      // ログインしているユーザー
      userId: user._id,
      // useRef()の入力値
      // useRef とは、書き換え可能な値を.currentプロパティ内に保持することができる「箱」のようなものです。
      desc: desc.current.value,
    };

    if (file) {
      // フォームの現在のキーと値が設定されます
      const data = new FormData();
      const fileName = Date.now() + file.name;
      // FormDataオブジェクト内の既存のキーに新しい値を追加するか、キーがまだ存在しない場合は追加します
      // 同じファイル(時間違い)
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      try {
        // 画像APIを叩く
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      // posts.jsのAPIを叩く
      await axios.post("/posts", newPost);
      // location.reload() 現在の URL を再読み込みします。
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(inputText);

  // const handleChange = (e) => setInputValue(e.target.value);

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            // ログインしているユーザーの画像が存在すれば
            src={
              user.profilePicture
                ? `${PUBLIC_FOLDER}${user.profilePicture}`
                : `${PUBLIC_FOLDER}/person/noAvatar.png`
            }
            alt=""
            className="sharePersonProfileImg"
          />
          <input
            type="text"
            className="shareInput"
            placeholder="いま何してる?"
            ref={desc}
            // onChange={(e) => handleChange(e)}
            // value={inputValue}
          />
        </div>
        <hr className="shareHr" />

        <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
          <div className="shareOptions">
            <label className="shareOption" htmlFor="file">
              <Image className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">写真</span>
              {/* accept 属性は、値としてカンマ区切りでファイル種別または固有ファイル種別指定子を取り、どのファイル種別を受け入れるかを記述します。 accept プロパティは file 型の <input> 要素のプロパティです。 */}
              {/* type="file" 型の <input> 要素は、ユーザーが一つまたは複数のファイルを端末のストレージから選択することができるようにします。 */}
              <input
                type="file"
                // label forと合わせる
                id="file"
                name="file"
                accept=" .png, .jpeg, .jpg"
                style={{ display: "none" }}
                //DOM が提供する FileList オブジェクトは、File オブジェクトとして指定された、ユーザーが選択したすべてのファイルをリストアップします。ファイルリストの length 属性の値をチェックすることで、ユーザーが選択したファイルの数を知ることができます。 FileListの0番目にファイルの名前などを格納
                // eventのtargetには「files」というプロパティが用意されています。
                // これは「FileList」という複数ファイルを管理するオブジェクトが設定されています。
                // このFileListでは、配列のようにファイルが管理されているのです。
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Gif className="shareIcon" htmlColor="hotpink" />
              <span className="shareOptionText">GIF</span>
            </div>
            <div className="shareOption">
              <Face className="shareIcon" htmlColor="green" />
              <span className="shareOptionText">気持ち</span>
            </div>
            <div className="shareOption">
              <Analytics className="shareIcon" htmlColor="red" />
              <span className="shareOptionText">投票</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            送信
          </button>
        </form>
      </div>
    </div>
  );
};
