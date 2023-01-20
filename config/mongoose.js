const mongoose = require("mongoose");
const env = require("./environment")
async function main() {
  await mongoose.connect(`mongodb://localhost/${env.db}`);
  console.log("Connected to Database :: MongoDB");
}
main().catch((err) => {
  console.log("failed to connect ", err);
});

module.exports = mongoose;
