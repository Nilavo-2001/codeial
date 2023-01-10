const mongoose = require("mongoose");
const resetPasswordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  acessToken: {
    type: String,
  },
  isValid: {
    type: Boolean,
  },
});

const token = mongoose.model("reset-password", resetPasswordSchema);

module.exports = token;
