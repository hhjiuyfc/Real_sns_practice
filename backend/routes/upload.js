// 新しいルーターオブジェクトを作成します。
const router = require("express").Router();

const multer = require("multer");

// 保存先
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/public/images");
  },
  // ファイル名
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

//画像アップロードAPI
// 単一ファイルのアップロード "file" は input[type="file"] エレメントの name 属性です。
// このディレクトリー(/)
router.post("/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("画像アップロードに成功");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
