const express = require("express");
const {loginUser, logoutUser, generateNewAccessToken} = require("../controllers/authControllers");
const requireSignin = require("../middlewares/requireSignin");
const authRouter = express.Router();
authRouter.post("/login", loginUser);
authRouter.post("/logout", requireSignin, logoutUser);
authRouter.get("/access-token", requireSignin, generateNewAccessToken);

module.exports = authRouter;