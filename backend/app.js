const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const app = express();
const { readdirSync } = require("fs");

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

//routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("server is listening on port : ", PORT);
  });
};
server();
