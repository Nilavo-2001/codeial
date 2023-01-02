const postdb = require("../models/posts");
const comments = require("../models/comment");
module.exports.create = async function (req, res) {
  try {
    let post = await postdb.create({
      content: req.body.content,
      user: req.user.id,
    });
    let npost = await postdb.findById(post.id).populate("user");
    if (req.xhr) {
      return res.status(200).json({
        data: {
          posts: npost,
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
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "post sucessfully deleted",
        });
      }
      req.flash("sucess", "Post deleted");
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error", error);
  }
};
