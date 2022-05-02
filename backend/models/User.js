// データ構造(スキーマー)
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // 必ず必要
      required: true,
      min: 3,
      max: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      // 文字数
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 50,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      // 画像
      type: String,
      default: "",
    },
    followers: {
      // フォロワーは増加するのでArray
      type: Array,
      default: [],
    },
    followings: {
      // 自分のフォローしている人増えるのでArray
      type: Array,
      default: [],
    },
    isAdmin: {
      // 認証済みかどうか
      type: Boolean,
      default: false,
    },
    desc: {
      // 概要(情報)
      type: String,
      max: 70,
    },
    city: {
      //  どこに住んでいるのか
      type: String,
      max: 50,
    },
  },
  // detaを格納した時間
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
