const express = require("express");
const {createNewUser, getCurrentUser} = require("../controllers/userControllers");
const {registerValidation, validate} = require("../middlewares/dataValidation");
const requireSignin = require("../middlewares/requireSignin");
const userRouter = express.Router();
userRouter.post("/", registerValidation, validate, createNewUser);
userRouter.get("/me", requireSignin, getCurrentUser);
module.exports = userRouter;