const mongoose = require("mongoose");
async function main() {
  await mongoose.connect("mongodb://localhost/codeial_development");
  console.log("Connected to Database :: MongoDB");
}
main().catch((err) => {
  console.log("failed to connect ", err);
});

module.exports = mongoose;
