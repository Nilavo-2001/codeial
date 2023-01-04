const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVT_PATH = "/uploads/users/avatars";
let userScehma = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// defining the destination of storing the files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVT_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
// setting static functions which can be accessed anywhere we import user model/collection
userScehma.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
userScehma.statics.avatarPath = AVT_PATH;
const user = mongoose.model("User", userScehma);
module.exports = user;
