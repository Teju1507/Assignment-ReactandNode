const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
})
const users = new mongoose.model("users", userSchema)
module.exports = users
