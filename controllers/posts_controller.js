const postdb = require("../models/posts");
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
