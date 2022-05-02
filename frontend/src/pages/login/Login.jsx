import React, { useRef, useContext } from "react";
import "./Login.css";
import { loginCall } from "../../actionCalls";
import { AuthContext } from "../../state/AuthContext";

export const Login = () => {
  // inputタグを監視(ref={email})
  const email = useRef();
  const password = useRef();
  // userが存在するのか? ログインしているのか?を監視
  // AuthContextのvalueのオブジェクトの分割代入
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // .currentプロパティ内(inputタグ)に値を保持することができます。.valueで値をみる
    // console.log(email.current.value);
    // console.log(password.current.value);
    // API
    loginCall(
      {
        // inputの打ち込んだ値
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">本格なSNSを自分の手で。</span>
        </div>
        <div className="loginRight">
          {/* loginBox全体をformで囲まないとバリデーション効かない */}
          {/* 送信した時 */}
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMessage">ログインはこちらから</p>

            <input
              // フィールド上の現在の値が妥当なメールアドレスであるかどうかを視覚的に示します。
              type="email"
              className="loginInput"
              placeholder="メールアドレス"
              required
              // useRef とは、書き換え可能な値を .current プロパティ内に保持することができる「箱」のようなものです。
              ref={email}
            />
            <input
              // テキストは読み取られることがないように、1 つ 1 つの文字がアスタリスク ("*") やドット ("•") のような記号に置き換えられ、隠されます。
              type="password"
              className="loginInput"
              placeholder="パスワード"
              // 所有するフォームを送信する前にユーザーが入力に値を指定しなければならない
              required
              // minLength="6" を追加すると、値は空か6文字以上でないと有効にはならなくなります。
              minLength="6"
              ref={password}
            />
            <button className="loginButton">ログイン</button>
            <span className="loginForgot">パスワードを忘れた方へ</span>
            <button className="loginRegisterButton">アカウント作成</button>
          </form>
        </div>
      </div>
    </div>
  );
};
