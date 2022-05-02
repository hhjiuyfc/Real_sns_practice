// ユーザー入力に応じたアクションの設定
export const LoginStart = (user) => ({
  type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
  // アクションの名前
  type: "LOGIN_SUCCESS",
  // ログインに成功した時の状態
  payload: user,
});
// type: "アクションの種類を一意に識別できる文字列またはシンボル",
// payload: "アクションの実行に必要な任意のデータ",
export const LoginError = (error) => ({
  type: "LOGIN_ERROR",
  payload: error,
});
