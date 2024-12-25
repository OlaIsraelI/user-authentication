const http = require("http");

//import express app from app.js file
const app = require("./app");

//create a http server
const httpServer = http.createServer(app);

const { PORT } = require("./config/index");
const connectDb = require("./helpers/db");
//pass app as a call back function to httpServer create method
//this is to enable the server to listen to incoming http requests
const startServer = async () => {
  await connectDb();
  httpServer.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
};

startServer();