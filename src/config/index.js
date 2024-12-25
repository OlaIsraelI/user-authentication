const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET
}