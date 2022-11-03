const postdb = require("../models/posts");
module.exports.home = function (req, res) {
  postdb
    .find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec((err, posts) => {
      if (err) {
        console.log("Unable to find posts");
        return;
      }
      return res.render("home", {
        title: "Home",
        posts: posts,
      });
    });
};

// module.exports.actionName = function(req, res){}
