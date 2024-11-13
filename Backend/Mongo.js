const express = require("express");
const mongoos = require("mongoose");
const app = express();

mongoos.connect(
  "mongodb+srv://kiruthikamsk:development404@dev-cluster.h35yz.mongodb.net"
);

app.listen(3000, () => {
  console.log("mongo is tasty");
});
