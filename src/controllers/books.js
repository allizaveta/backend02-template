const Book = require("../models/book");

//список всех книг из БД
const getBooks = (req, res) => {
  Book.find({})
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

//данные конкретной книги по айди
const getBook = (req, res) => {
  const { book_id } = req.params;
  Book.findById(book_id)
    .then((book) => {
      if (!book) {
        return res.status(404).send("book not found");
      } else {
        res.status(200).send(book);
      }
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

//добавить книгу
const createBook = (req, res) => {
  Book.create({ ...req.body })
    .then((book) => {
      res.status(201).send(book);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};
//изменить книгу по айди
const updateBook = (req, res) => {
  const { book_id } = req.params;
  Book.findByIdAndUpdate(book_id, { ...req.body })
    .then((book) => {
      if (!book) {
        return res.status(404).send("book not found");
      } else {
        res.status(200).send(book);
      }
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

//удалить книгу
const deleteBook = (req, res) => {
  const { book_id } = req.params;
  Book.findByIdAndDelete(book_id)
    .then((book) => {
      if (!book) {
        return res.status(404).send("book not found");
      } else {
        res.status(200).send("Success");
      }
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};