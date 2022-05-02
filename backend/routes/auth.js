const router = require("express").Router();
// User.jsを取り込む
const User = require("../models/User");

//  ユーザー登録(Userをインスタンス化)
router.post("/register", async (req, res) => {
  try {
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    // 保存
    const user = await newUser.save();
    //  JSON形式で
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ログイン
router.post("/login", async (req, res) => {
  try {
    // メールでユーザーを識別(クライアント (ブラウザなど) からAPIにデータを送信する必要があるとき、データを リクエストボディ (request body) として送ります。)
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // 文字列だけならsend() status()でステータスコードを設定でき、send()でレスポンスボディを設定できます。
      return res.status(404).send("ユーザーが見つかりません。");
    }
    // リクエストパスワードと登録されているパスワードが一致しているならログインできる
    const validatePassword = req.body.password === user.password;
    if (!validatePassword)
      // 何らかのクライアント側のエラーであると分かったために、サーバーがそのリクエストを処理しない (できない) ことを表します (例えば、リクエストの構文が正しくない、リクエストメッセージのフレーミングが無効、リクエスト経路に偽りがあるなど)。
      return res.status(400).send("パスワードが違います。");
    return res.status(200).json(user);
  } catch (err) {
    // サーバから返るものは全てJSONである事が前提となる。
    return res.status(500).json(err);
  }
});
// /api/usersをエンドポイント
// router.get("/", (req, res) => {
//   res.send("auth router");
// });
// 他で使えるように (1つだけをエクスポートするモジュールがある場合などは module.exports を使用する)
module.exports = router;
