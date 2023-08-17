const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const { connection } = require("./config/db");
const { travelRouter } = require("./router/travel.router");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("I am a server");
});

app.use("/travel", travelRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db at port 8000");
  } catch (error) {
    console.log("not connected to db");
  }
});
