const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./Database/db");
const { router } = require("./Routes/AllRoutes");

const app = express();
app.use(express.json());

app.use(cors());
app.use(router);

const dbConnect = async () => {
  await connection;
};
dbConnect().then(() => {
  app.listen(`${process.env.PORT}`, (req, res) => {
    console.log("Server is Running");
  });
});
