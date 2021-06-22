const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/user");

const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRouter);

app.use((req, res) => {
  res.status(404).send();
});

const server = http.createServer(app);

server.listen(8080);
