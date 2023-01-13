const posts = require("../models/posts");
const comments = require("../models/comment");
const likes = require("../models/likes");
const { json } = require("express");
const { findOne } = require("../models/posts");

module.exports.toggleLike = async (req, res) => {
  // console.log(req.query.id, req.query.type);
  try {
    let likeable;
    let deleted = false;
    const id = req.query.id;
    const type = req.query.type;
    if (type == "Post") {
      likeable = await posts.findById(id).populate("likes");
    } else {
      likeable = await comments.findById(id).populate("likes");
    }
    let exsistingLike = await likes.findOne({
      likeable: id,
      user: req.user._id,
      onModel: type
    });
    //console.log(exsistingLike);
    if (exsistingLike) {
      //console.log("I am here");
      likeable.likes.pull(exsistingLike._id),
        likeable.save();

      exsistingLike.remove();
      deleted = true
    }
    else {

      let newLike = await likes.create({
        user: req.user._id,
        likeable: id,
        onModel: type
      })
      //console.log(newLike);
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
