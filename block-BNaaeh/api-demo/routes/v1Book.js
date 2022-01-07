var express = require('express');
var User = require('../models/user');
var Book = require('../models/book');

var router = express.Router();

router.get('/', function (req, res, next) {
  Book.find({}, (err, books) => {
    if (err) return next(err);

    res.json({ books });
  });
});

router.post('/', (req, res, next) => {
  let data = req.body;
  Book.create(data, (err, createdBook) => {
    if (err) return next(err);
    res.json({ createdBook });
  });
});


router.put('/:id', (req, res, next) => {
  let data = req.body;
  let boodId = req.params.id;

  Book.findByIdAndUpdate(bookId, data, (err, updatedBook) => {
    if (err) return next(err);
    res.json({ updatedBook });
  });
});


router.delete('/:id', (req, res, next) => {
  let boodId = req.params.id;

  Book.findByIdAndDelete(bookId, (err, deletedBook) => {
    if (err) return next(err);
    res.json({ deletedBook });
  });
});


router.get('/:id', (req, res, next) => {
  let boodId = req.params.id;

  Book.findById(bookId, (err, book) => {
    if (err) return next(err);
    res.json({ book });
  });
});

module.exports = router;