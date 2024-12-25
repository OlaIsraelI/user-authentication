const mongoose = require("mongoose");
const { DB_URI } = require("../config");
const connectDb = async () => {
  await mongoose
    .connect (DB_URI,)
    .then (() => console.log("Database connected successfully"))
    .catch ((error) => console.log("Database connection failed", error));
};

module.exports = connectDb;