export const AuthReducer = (state, action) => {
  // アクションに応じて状態を変える(更新)
  switch (action.type) {
    case "LOGIN_START":
      return {
        // ログインしていない
        user: null,
        // データを取得
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        // ログインに成功した時の状態
        user: action.payload,
        // データを取得終了
        isFetching: false,
        error: false,
      };
    case "LOGIN_ERROR":
      return {
        // ログインしていない
        user: null,
        isFetching: false,
        error: action.payload,
      };
    // 最終的な状態(新しい状態)を返す
    default:
      return {
        state,
      };
  }
};
