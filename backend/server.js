// プログラムの最初に require() を記述することで、指定したモジュールやファイルを Node.js で扱えるようになります
const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
const PORT = 5000;
const mongoose = require("mongoose");
const path = require("path");
// dbのURLを.envファイルに
require("dotenv").config();

// データベース接続(.envの環境変数)
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("dbと接続中...");
  })
  .catch((err) => {
    console.log(err);
  });

// ミドルウエア(エンドポイント, ルーティング設定)
// app.use で関数をセットすると、リクエストを受けた時にそれらの関数を順々に実行します。この関数をミドルウェアと呼びます。
// 「app.use(express.json())」を追記することで、
// JSON形式で設定
app.use(express.json());
// http://localhost:5000/imagesを見ているときはpublic/imagesをみる
// 静的なファイルを見に行った時は、現在のディレクトリー + public/images
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);

// (エンドポイント、 コールバック関数) サーバー側(resで返す) localhost:3000(フロント)
// app.get("/", (req, res) => {
//   res.send("hello express");
// });
// app.get("/users", (req, res) => {
//   res.send("users express");
// });

// サーバー立ち上げる
app.listen(PORT, () => console.log("サーバーが起動"));
