const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRouter);

app.use((req, res) => {
  res.status(404).send();
});

const server = http.createServer(app);

server.listen(8080);
