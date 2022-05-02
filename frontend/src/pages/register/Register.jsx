import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export const Register = () => {
  const email = useRef();
  const password = useRef();
  // 確認用パスワード
  const passwordConfirmation = useRef();
  // ユーザーネーム
  const username = useRef();
  // LinkユーザーがURLを変更できるようにするため、または自分で変更できるようにするために使用しuseNavigateます
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // パスワードと確認用パスワードが合っていない
    if (password.current.value !== passwordConfirmation.current.value) {
      // 確認用パスワードにカスタム検証メッセージを設定します。引数(検証エラーに使用するメッセージです。)
      passwordConfirmation.current.setCustomValidity("パスワードが違います。");
      // パスワードと確認用パスワードが合っている
    } else {
      try {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        // registerAPIを叩く(backendのauth.jsのAPI)
        // データ構造(スキーマー) User.jsでDBに新規登録される
        await axios.post("auth/register", user);
        // "/login"へリダイレクトuseNavigate()
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">本格なSNSを自分の手で。</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMessage">新規登録はこちらから</p>
            <input
              type="text"
              className="loginInput"
              placeholder="ユーザー名"
              required
              // inputタグの値を取得
              ref={username}
            />
            <input
              type="email"
              className="loginInput"
              placeholder="メールアドレス"
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="パスワード"
              minLength="6"
              required
              ref={password}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="確認用パスワード"
              minLength="6"
              required
              ref={passwordConfirmation}
            />
            {/* type="submit"と指定すると、フォーム（<form>）の送信ボタンとして機能するようになります。ボタンを押すと、メールアドレスの情報がサーバーに送られるわけですね */}
            <button className="loginButton" type="submit">
              サインアップ
            </button>

            <button className="loginRegisterButton">ログイン</button>
          </form>
        </div>
      </div>
    </div>
  );
};
