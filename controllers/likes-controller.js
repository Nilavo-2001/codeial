const posts = require("../models/posts");
const comments = require("../models/comment");
const likes = require("../models/likes");
const { json } = require("express");
const { findOne } = require("../models/posts");

module.exports.toggleLike = async (req, res) => {
  try {
    let likeable; // variable to store the parent
    let deleted = false; // deleted if flase means comment created and true means comment deleted
    const id = req.query.id;  // the id of the parent
    const type = req.query.type; // the type of parent that is post or comment
    if (type == "Post") {
      likeable = await posts.findById(id).populate("likes"); // fetching the post if the post is parent
    } else {
      likeable = await comments.findById(id).populate("likes"); // fetching the comment if the comment is parent
    }
    let exsistingLike = await likes.findOne({ // finding if the like exsists
      likeable: id,
      user: req.user._id,
      onModel: type
    });
    //console.log(exsistingLike);
    if (exsistingLike) {
      // if the like exsists then delete the like
      likeable.likes.pull(exsistingLike._id),
        likeable.save();

      exsistingLike.remove();
      deleted = true
    }
    else {
      // if the like doesnot exsists then create the like
      let newLike = await likes.create({
        user: req.user._id,
        likeable: id,
        onModel: type
      })
      // adding the like to its parent
      likeable.likes.push(newLike._id);
      likeable.save();
    }
    return res.status(200).json({
      message: "Request Sucessful",
      deleted: deleted,
      likes: likeable.likes.length
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server error"
    })
  }
};
