const express = require("express");

const Order = require("./order.model");
const { postAOrder, getOrderByEmail } = require("./orderController");

const router = express.Router();

router.post("/", postAOrder);

//get orders by email address

router.get("/email/:email", getOrderByEmail);

module.exports = router;
