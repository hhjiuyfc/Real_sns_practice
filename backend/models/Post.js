const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      // 必須
      required: true,
    },
    // 呟き(text)
    desc: {
      type: String,
      max: 200,
    },
    img: {
      // パス
      type: String,
    },
    // いいね(誰がいいねを押したのか?)
    likes: {
      type: Array,
      default: [],
    },
  },
  // 投稿した日時
  { timestamps: true }
);
// スキーマを定義し、mongoose.modelでスキーマモデル名を指定してスキーマを作成します。
module.exports = mongoose.model("Post", PostSchema);
