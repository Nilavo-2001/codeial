const postdb = require("../models/posts");
const comments = require("../models/comment");
module.exports.create = (req, res) => {
  postdb.create(
    {
      content: req.body.content,
      user: req.user.id,
    },
    function (err, post) {
      if (err) {
        console.log("error in creating a post");
        return;
      }
      return res.redirect("back");
    }
  );
};

module.exports.destroy = (req, res) => {
  postdb.findById(req.params.id, (err, post) => {
    if (!post) {
      return res.redirect("back");
    }
    if (post.user == req.user.id) {
      post.remove();
      comments.deleteMany({ post: req.params.id }, (err) => {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  });
};
