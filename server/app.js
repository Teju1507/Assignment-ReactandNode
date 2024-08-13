require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("./db/conn")
const users = require("./models/userSchema")
const cors = require("cors")
const router = require("./routes/router")

const port = 8004

app.use(cors())
app.use(express.json())

app.use(router)

app.listen(port, () => {
  console.log(`server is start port number ${port}`)
})
// require("dotenv").config()
// const express = require("express")
// const { createProxyMiddleware } = require("http-proxy-middleware")
// const app = express()
// const mongoose = require("mongoose")
// require("./db/conn") // Assuming this file connects to MongoDB
// const users = require("./models/userSchema")
// const cors = require("cors")
// const router = require("./routes/router")

// const port = 8004

// app.use(cors())
// app.use(express.json())

// // Use router for your API routes
// app.use("/api", router) // Adjust the route prefix as needed

// // Proxy middleware configuration
// app.use(
//   "/api", // This is the path where the proxy will be active
//   createProxyMiddleware({
//     target: "http://localhost:3001", // Target port
//     changeOrigin: true,
//     pathRewrite: {
//       "^/api": "", // Remove `/api` from the path before sending to target
//     },
//   })
// )

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`)
// })
