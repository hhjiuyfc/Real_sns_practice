import axios from "axios";

export const loginCall = async (user, dispatch) => {
  // 通知
  dispatch({ type: "LOGIN_START" });
  try {
    // user監視(inputフォームに打ち込んだメールアドレスとパスワード)backendのauth.jsのログインAPI
    const response = await axios.post("/auth/login", user);

    // type: "アクションの種類を一意に識別できる文字列またはシンボル",
    // payload: "アクションの実行に必要な任意のデータ(user情報)",

    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (err) {
    // エラーに関する情報
    dispatch({ type: "LOGIN_ERROR", payload: err });
  }
};
