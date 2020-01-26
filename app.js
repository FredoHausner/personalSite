"use strict";
var express = require("express");
var app = express();
var fs = require("fs");
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail,",
  auth: {
    user: "fredohausner@gmail.com",
    pass: ""
  }
});

app.use(express.static("www"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var lobbyCount = 0;

var lobbyArray = {};
// @tmomail.net

app.post("/send_email", async function (req, res) {
  console.log(req.body);
  let message = await transporter.sendMail({
    from: `<fredohausner@gmail.com>`,
    to: "fredohausner@gmail.com",
    subject: `MESSAGE FROM WEBSITE`,
    text: `message from: ${req.body.userEmail}\n\n${req.body.userContent}`
  });
});

// var lobbyCheck = [];
// var lobbyTimeout;

io.on("connection", function (socket) {

  // let message = transporter.sendMail({
  //   from: '<fredohausner@gmail.com>',
  //   to: "2066126692@tmomail.net",
  //   text: 'Someone is on fredogonzalez.com'
  // })

  lobbyCount++;
  io.emit("lobby count", lobbyCount);
  socket.on("disconnect", function () {
    lobbyCount--;
    io.emit("lobby count", lobbyCount);
    io.emit("user left");
  });

  socket.on("user joined", function (userObj) {
    socket.broadcast.emit("user joined", userObj.username);
    userObj.status = false;
    lobbyArray[userObj.user_id] = userObj;
  });

  socket.on("chat message", function (msg) {
    fs.appendFile(
      "chat.txt",
      `\nUsername: ${msg.user}\nMessage: ${msg.msg}\nDate: ${Date.now()}\n`,
      function (err) {
        if (err) throw err;
      }
    );
    socket.broadcast.emit("chat message", msg);
  });

  socket.on("user typing", function () {
    socket.broadcast.emit("user typing");
  });
});

http.listen(80, function () {
  console.log("listening on port: 80");
});
