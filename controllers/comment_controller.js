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
