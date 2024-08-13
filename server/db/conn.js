const mongoose = require("mongoose")

// Corrected connection string
const DB = "mongodb+srv://tejaswini:tejaswinisairam@cluster0.9haxk.mongodb.net/"

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection successful"))
  .catch((error) => console.log("MongoDB connection error:", error.message))
