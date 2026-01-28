const Book = require("./book.model");

const postABook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res.status(200).send({ message: "Book post successfully", book: newBook });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ message: "Failed to create book" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.send(books);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ message: "Failed to fetching books" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(400).send({ message: "Book not found" });
    }
    res.send(book);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ message: "Failed to fetch book" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateBook) {
      res.status(400).send({ message: "Book is not found" });
    }

    res.send({
      message: "Book updated successfully",
      book: updateBook,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ message: "Failed to update book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    if (!deleteBook) {
      res.status(400).send({ message: "Book is not found" });
    }
    res.send({
      message: "Book deleted successfully",
      book: deleteBook,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ message: "Failed to delete book" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
