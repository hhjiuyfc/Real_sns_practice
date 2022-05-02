const { findById } = require("../models/User");
const User = require("../models/User");

// express.Router() を使うことでルーティングを複数のファイルに分割
const router = require("express").Router();

// CRUD
// ユーザー情報の更新
router.put("/:id", async (req, res) => {
  // PostmanでリクエスしたIdとDBのidが一致し、または認証ずみなら更新
  // クエリパラメーターを取得(req.params.id)
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      // ログインしているユーザーを見つけて更新(await忘れないように)
      const user = await User.findByIdAndUpdate(req.params.id, {
        // $set演算子は、フィールドの$set値を指定された値に置き換えます(Mongo DB)
        $set: req.body,
      });
      res.status(200).json("ユーザー情報が更新されました。");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    // 認証が拒否されたことを示します
    return res.status(403).json("情報を更新できません");
  }
});

// ユーザー情報の削除

router.delete("/:id", async (req, res) => {
  // PostmanでリクエスしたIdとDBのidが一致し、または認証ずみなら削除
  // クエリパラメーターを取得(req.params.id)
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      // ログインしているユーザーを見つけて削除(await忘れないように)
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("ユーザー情報が削除されました。");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    // 認証が拒否されたことを示します
    return res.status(403).json("削除できません");
  }
});

// ユーザー情報の取得

// router.get("/:id", async (req, res) => {
//   // PostmanでリクエスしたIdとDBのidが一致し、または認証ずみなら削除
//   // クエリパラメーターを取得(req.params.id)

//   try {
//     // ログインしているユーザーを見つけて取得(await忘れないように)
//     const user = await User.findById(req.params.id);
//     // ユーザー情報のすべてから,password, updatedAt取り除く。
//     // オブジェクトのメンバ変数_docにMongDBのドキュメントの値が全て詰まっている
//     const { password, updatedAt, ...other } = user._doc;
//     return res.status(200).json(other);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

// クエリでユーザー情報の取得

router.get("/", async (req, res) => {
  // ランダムなuserId(~/~/~?userId=xxx ?以降を見ている)
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    // クエリがuserIdIならuserIdが適合探す
    // クエリが(usernameなら)usernameが適合するのをさがす
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    // ユーザー情報のすべてから,password, updatedAt取り除く。
    // オブジェクトのメンバ変数_docにMongDBのドキュメントの値が全て詰まっている
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// ユーザーのフォロー(更新)
router.put("/:id/follow", async (req, res) => {
  // 自分のidとフォローする人のidが等しくない場合にフォローできる
  if (req.body.userId !== req.params.id) {
    try {
      // フォローする相手
      const user = await User.findById(req.params.id);
      // 自分
      const currentUser = await User.findById(req.body.userId);
      // フォロワーに自分が(含まれていない)いなかったらフォローできる
      // includes() メソッドは、特定の要素が配列に含まれているかどうかを true または false で返します。
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({
          // MongoDB公式 追加($push演算子は、指定された値を配列に追加します。)
          $push: {
            followers: req.body.userId,
          },
        });
        // 自分のフォローしている人増える
        await currentUser.updateOne({
          $push: {
            followings: req.params.id,
          },
        });
        return res.status(200).json("フォローに成功しました。");
      } else {
        return res
          .status(403)
          .json("あなたはこのユーザをすでにフォローしています。");
      }
      // 何かエラーが起きた
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をフォローできません。");
  }
});

// ユーザーのフォローを外す
router.put("/:id/unfollow", async (req, res) => {
  // 他人のアカウント(自分のidとフォローする人のidが等しくない場合に)フォロー解除(自分自身はフォロー解除できない。)
  if (req.body.userId !== req.params.id) {
    try {
      // フォローする相手のアカウント
      const user = await User.findById(req.params.id);
      // 自分のアカウント
      const currentUser = await User.findById(req.body.userId);

      // フォロワーに自分が存在したらフォローを外せる
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({
          // MongoDB公式 追加(演算子は、既存の$pull配列から、指定された条件に一致する1つまたは複数の値の
          // すべてのインスタンスを削除します。)
          $pull: {
            followers: req.body.userId,
          },
        });
        // 自分のアカウントのフォローしている人削除
        await currentUser.updateOne({
          $pull: {
            followings: req.params.id,
          },
        });
        return res.status(200).json("フォローを解除しました。");
      } else {
        return res.status(403).json("このユーザーはフォロー解除できません。");
      }
      // 何かエラーが起きた
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(500).json("自分自身をフォロー解除できません。");
  }
});

// 他で使えるように (1つだけをエクスポートするモジュールがある場合などは module.exports を使用する)
module.exports = router;
