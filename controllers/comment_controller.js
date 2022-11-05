const comments = require("../models/comment");
const posts = require("../models/posts");
module.exports.create = function (req, res) {
  posts.findById(req.body.post, (err, post) => {
    if (err) {
      console.log("error finding the post to comment");
      return;
    }
    if (post) {
      comments.create(
        {
          content: req.body.content,
          user: req.user.id,
          post: req.body.post,
        },
        (err, comment) => {
          post.comments.push(comment);
          post.save();
          res.redirect("/");
        }
      );
    }
  });
};

module.exports.destroy = function (req, res) {
  comments.findById(req.params.id, (err, comment) => {
    if ((comment.user = req.user.id)) {
      let postid = comment.post;
      comment.remove();
      posts.findByIdAndUpdate(
        postid,
        { $pull: { comments: req.params.id } },
        (err, post) => {
          res.redirect("back");
        }
      );
    } else {
      res.redirect("back");
    }
  });
};
