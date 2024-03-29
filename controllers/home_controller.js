const postdb = require("../models/posts");
const users = require("../models/user");
module.exports.home = async function (req, res) {
  try {
    let posts = await postdb
      .find({})
      .sort("-createdAt")
      .populate("user")
      .populate("likes")
      .populate({
        path: "comments",
        populate: [{
          path: "user",
        }, {
          path: "likes",
        }]
      });
    //console.log(posts[0].comments[0]);
    let all_users = await users.find({});
    return res.render("home", {
      title: "Home",
      posts: posts,
      all_users: all_users,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

// module.exports.actionName = function(req, res){}
