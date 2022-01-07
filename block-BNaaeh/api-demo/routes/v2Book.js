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


router.get('/:id/comments', (req, res, next) => {
  let bookId = req.params.id;

  Book.findById(bookId)
    .populate('comments')
    .exec((err, book) => {
      if (err) return next(err);
      res.json({ book });
    });
});


router.post('/:id/comment/new', (req, res, next) => {
  let bookId = req.params.id;
  let data = req.body;
  data.createdBy = req.user.id;
  Comment.create(data, (err, createdComment) => {
    if (err) return next(err);
    User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { comments: createdComment.id },
      },
      (err, updatedUser) => {
        res.json({ createdComment, updatedUser });
      }
    );
  });
});


router.get('/:id/comment/edit/:commId', (req, res, next) => {
  let bookId = req.params.id;
  let commentId = req.params.commId;

  Comment.findById(commentId, (err, comment) => {
    if (err) return next(err);
    res.json({ comment });
  });
});

router.post('/:id/comment/edit/:commId', (req, res, next) => {
  let bookId = req.params.id;
  let commentId = req.params.commId;
  let data = req.body;

  Comment.findByIdAndUpdate(commentId, data, (err, updatedComment) => {
    if (err) return next(err);
    res.json({ updatedComment });
  });
});

router.get('/:id/comment/delete/:commId', (req, res, next) => {
  let bookId = req.params.id;
  let commentId = req.params.commId;

  Comment.findByIdAndDelete(commentId, (err, deletedComment) => {
    if (err) return next(err);
    User.findByIdAndUpdate(
      deletedComment.createdBy,
      {
        $pull: { comments: deletedComment.id },
      },
      (err, updatedUser) => {
        if (err) return next(err);
        res.json({ deletedComment, updatedUser });
      }
    );
  });
});

module.exports = router;