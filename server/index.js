const express = require("express");
require("dotenv").config();
const http = require("http");
const path = require("path");
// var socketio = require("socket.io");
const bodyParser = require("body-parser");
var PORT = process.env.PORT || 8174;
const app = express();
const cors = require("cors");
const db = require("../db");
const routes = require("../routes/index.js");
const amzItemsRoute = require("../routes/amzItemRoute.js");
const fileupload = require("express-fileupload");

const options = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    // transports: ["websocket"],
    credentials: true,
  },
  allowEI03: true,
  origins: ["http://127.0.0.1:8174"],
};

db.on("error", console.error.bind(console, "MongoDB connection Error"));
const server = http.createServer(app);

app.use(fileupload());
app.use(express.static("files"));
app.use("*", cors());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const io = socketio(server, options);

// require("./serverState")(app, io);

app.use("/api", routes);
app.use("/items", amzItemsRoute);

// app.use('/', socketInit);

// "../../../frontend/angryaliensfrontend/build"

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../../cantbelievefrontend/out"))
  );
  app.get("*", (request, res) => {
    res.sendFile(
      path.join(__dirname, "../../cantbelievefrontend/out", "index.html")
    );
  });
} else {
  PORT = 8174;
}

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
