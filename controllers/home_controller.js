const postdb = require("../models/posts");
const users = require("../models/user");
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
      users.find({}, (err, users) => {
        return res.render("home", {
          title: "Home",
          posts: posts,
          all_users: users,
        });
      });
    });
};

// module.exports.actionName = function(req, res){}
