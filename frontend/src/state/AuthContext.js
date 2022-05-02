//  状態をグローバルに管理
import React, { createContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";
// 最初のユーザー状態を定義(ログインしていない)
const initialState = {
  // リダイレクト防ぐ
  // user: null,
  user: {
    _id: "625eea94868c757f0a265fa9",
    username: "HiroyukiSuzuki",
    email: "hoge@gmail.com",
    password: "abcdefg",
    profilePicture: "/person/1.jpeg",
    coverPicture: "",
    followers: [],
    followings: [],
    isAdmin: false,
  },
  isFetching: true,
  error: false,
};

// 状態をグローバルに管理(どのコンポーネントからでも参照)
// createConText(グローバルコンテキスト)でinitialStateをどこでも使える
export const AuthContext = createContext(initialState);
// 認証状態をどこでも提供
export const AuthContextProvider = ({ children }) => {
  // AuthReducerでstateを更新(アクションを通知 dispatch)
  // 第1引数useReducer関数 第2引数として初期state を渡すものです。(useReducer)
  // [ログインしているのか？、 Action typeの種類]
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return (
    // AuthContextをどこにでもvalueを提供
    <AuthContext.Provider
      value={{
        // useReducerで監視(state)
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        // アクションを実行する関数
        dispatch,
      }}
    >
      {/* <App/>でvalue使える */}
      {children}
    </AuthContext.Provider>
  );
};
