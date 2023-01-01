const postdb = require("../models/posts");
const comments = require("../models/comment");
module.exports.create = async function (req, res) {
  try {
    let post = await postdb.create({
      content: req.body.content,
      user: req.user.id,
    });
    if (req.xhr) {
      return res.status(200).json({
        data: {
          posts: post,
        },
        message: "Post created",
      });
    }
    req.flash("sucess", "Post added");
    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await postdb.findById(req.params.id);
    if (!post) {
      return res.redirect("back");
    }
    if (post.user == req.user.id) {
      await post.remove();
      await comments.deleteMany({ post: req.params.id });
      req.flash("sucess", "Post deleted");
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error", error);
  }
};
