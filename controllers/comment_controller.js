const comments = require("../models/comment");
const posts = require("../models/posts");
const mailer = require("../mailers/comments_mailer");
const likes = require("../models/likes");
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
      // syntax to populate an exsisting doc
      comment = await comments.populate(comment, { path: "user" });
      mailer.newComment(comment);
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "comment created sucessfully",
        });
      }
      req.flash("sucess", "Comment added");
      res.redirect("/");
    }
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports.destroy = async function (req, res) {
  let comment = await comments.findById(req.params.id);
  //console.log(req.params.id);
  //console.log(comment);
  if ((comment.user = req.user.id)) {
    let postid = comment.post;
    await comment.remove();
    await posts.findByIdAndUpdate(postid, {
      $pull: { comments: req.params.id },
    });
    await likes.deleteMany({
      likeable: req.params.id,
      onModel: "Comment"
    })
    if (req.xhr) {
      return res.status(200).json({
        data: {
          comment_id: req.params.id,
        },
        message: "post sucessfully deleted",
      });
    }
    req.flash("sucess", "Comment deleted");
    return res.redirect("back");
  } else {
    return res.redirect("back");
  }
};
