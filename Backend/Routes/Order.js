const express = require("express");
const { createOrder } = require("../Controllers/OrderController");
const router = express.Router();

router.route("/order").post(createOrder);
module.exports = router;