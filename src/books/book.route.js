const express = require("express");

const Book = require("./book.model");

const {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("./bookController");
const verifyAdminToken = require("../middleware/verifyAdminToken");

const router = express.Router();

router.post("/create-book",verifyAdminToken, postABook);

router.get("/", getAllBooks);

router.get("/:id", getSingleBook);

router.put("/edit/:id", verifyAdminToken, updateBook);

router.delete("/:id", deleteBook);

module.exports = router;
