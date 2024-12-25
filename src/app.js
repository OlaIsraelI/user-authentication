const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const app = express();

// Global middleware configuration to parse JSON data from the client
app.use(express.json());

// Global middleware configuration for Cross-Origin Resource Sharing (CORS)
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

// Global middleware configuration to parse the Cookie header
app.use(cookieParser());

// Basic route for checking server status
app.get("/", (req, res) => {
  res.send("Server is Working Fine");
});

// User and authentication routes
app.use("/users", userRouter);
app.use("/auth", authRouter);

// Export the app for use in other modules (like server.js)
module.exports = app;
