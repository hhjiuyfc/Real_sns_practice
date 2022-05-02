// 新しいルーターオブジェクトを作成します。(sever.jsにapp.use()でルーティング)
const router = require("express").Router();
// model(スキーマーをインポート)
const Post = require("../models/Post");
const User = require("../models/User");

// 投稿をする(作成)(endポイント "/api/posts/")
router.post("/", async (req, res) => {
  // インスタンス化して使えるように(userId, descなどを投稿して)
  const newPost = new Post(req.body);

  try {
    // 投稿保存
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);

    // try ブロックの中で例外が発生した場合に実行される文です。
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 投稿を更新する
router.put("/:id", async (req, res) => {
  try {
    // 投稿Idを探す
    const post = await Post.findById(req.params.id);
    // 自分が投稿した投稿内容
    if (post.userId === req.body.userId) {
      // «オブジェクト|配列»を更新 します
      await post.updateOne({
        // 演算子は、フィールドの$set値を指定された値に置き換えます。
        $set: req.body,
      });
      // サーバーのステータス(res)
      return res.status(200).json("投稿編集に成功しました。");
      // 編集するのが自分の投稿ではないとき
    } else {
      // 認証が拒否
      return res.status(403).json("あなたは他の投稿を編集できません。");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});

// 投稿を削除
router.delete("/:id", async (req, res) => {
  try {
    // postを探して
    const post = await Post.findById(req.params.id);
    // 投稿した本人なら
    if (post.userId === req.body.userId) {
      // 最初のドキュメントを削除します(空)
      await post.deleteOne();
      return res.status(200).json("投稿を削除しました!");
    } else {
      return res.status(403).json("あなたの投稿を削除できません");
    }
  } catch (err) {
    return res.status(403).json(err);
  }
});
// 特定の投稿を取得
router.get("/:id", async (req, res) => {
  try {
    // 投稿を探してくる
    const post = await Post.findById(req.params.id);
    // 第三者も観れる(ifの条件いらない)
    return res.status(200).json(post);
  } catch (err) {
    return res.status(403).json(err);
  }
});

// 特定の投稿にいいね(更新)
router.put("/:id/like", async (req, res) => {
  // 自分のアカウントとにいいね!できる

  try {
    // req.params.id(特定の投稿ID)
    // req.body.userId(いいねを押すID)
    const post = await Post.findById(req.params.id);

    // まだ、いいねが押されていなかったらいいねを押す

    // includes() メソッドは、特定の要素が配列に含まれているかどうかを true または false で返します。
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        // MongoDB公式 追加($push演算子は、指定された値を配列に追加します。)
        $push: {
          likes: req.body.userId,
        },
      });

      return res.status(200).json("投稿にいいねを押しました!");
      // 投稿にいいねが押されいたら
    } else {
      // いいねをしているユーザーIDを取り除く
      await post.updateOne({
        $pull: {
          // postmanで送るID(いいねを押す人)
          likes: req.body.userId,
        },
      });
      return res.status(403).json("投稿にいいねを外しました!");
    }
    // 何かエラーが起きた
  } catch (err) {
    return res.status(500).json(err);
  }
});

// タイムラインの投稿を取得 (router.get("/:id")と区別)
router.get("/timeline/:userId", async (req, res) => {
  try {
    // だれでも観れる(ifなし)
    // 自分の投稿
    const currentUser = await User.findById(req.params.userId);
    // 自分自身の投稿を全て検索(PostスキマーのuserId: currentUserの_idクエリ)
    const userPosts = await Post.find({ userId: currentUser._id });
    // 自分がフォローしている友達の投稿内容を全て取得
    // Promise.all()」は、Promiseの配列を引数にとり、

    // currentUserを取ってくるのを待つ 全てのPromiseが成功した場合は、各Promiseの「成功値」が入った配列を返すPromiseを返します
    const friendPosts = await Promise.all(
      // フォローしている人を検索 friendsPosts(Array)

      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    // 自分自身の投稿とフォローしている人の投稿をjson形式で返す(map関数でひとつずつ取り出しているので,スプレッド構文で取り出す)

    // concat() メソッドは、2つ以上の配列を結合するために使用します。このメソッドは既存の配列を変更せず、新しい配列を返します。

    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    return res.status(500).json(err);
  }
});
// プロフィール専用のタイムライン取得
router.get("/profile/:username", async (req, res) => {
  try {
    // 自分のプロフィール(DBにある1つのユーザーの名前探す)
    const user = await User.findOne({ username: req.params.username });
    // 自分自身の投稿を全て検索(PostスキマーのuserId: DBの_idクエリ)
    const posts = await Post.find({ userId: user._id });

    // 自分自身の投稿とフォローしている人の投稿をjson形式で返す(map関数でひとつずつ取り出しているので,スプレッド構文で取り出す)

    // concat() メソッドは、2つ以上の配列を結合するために使用します。このメソッドは既存の配列を変更せず、新しい配列を返します。

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// 他で使えるように (1つだけをエクスポートするモジュールがある場合などは module.exports を使用する)
module.exports = router;
