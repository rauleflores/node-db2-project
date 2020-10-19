const express = require("express");
const welcomeRouter = require("./welcome/welcome");
const carsRouter = require("./cars/cars-router");

const port = process.env.PORT || 5050;
const server = express();

server.use(express.json());
server.use(welcomeRouter);
server.use(carsRouter);

server.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
