const comments = require("../models/comment");
const posts = require("../models/posts");
module.exports.create = async function (req, res) {
  try {
    let post = await posts.findById(req.body.post);
    if (post) {
      let comment = await comments.create({
        content: req.body.content,
        user: req.user.id,
        post: req.body.post,
      });
      post.comments.push(comment.id);
      await post.save();
      req.flash("sucess", "Comment added");
      res.redirect("/");
    }
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports.destroy = async function (req, res) {
  let comment = await comments.findById(req.params.id);
  if ((comment.user = req.user.id)) {
    let postid = comment.post;
    await comment.remove();
    await posts.findByIdAndUpdate(postid, {
      $pull: { comments: req.params.id },
    });
    req.flash("sucess", "Comment deleted");
    return res.redirect("back");
  } else {
    return res.redirect("back");
  }
};
