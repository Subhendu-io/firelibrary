const { check } = require('express-validator');

exports.createBooks = [
  check('title', 'Your title is not valid.').exists().notEmpty().isLength({ min: 3, max: 100 }),
  check('author', 'Author name is not valid.').exists().notEmpty().isLength({ min: 3, max: 50 }),
  check('genre', 'Genre is not valid.').exists().notEmpty().isIn(['Fantasy', 'Literary', 'Mystery', 'Non-Fiction', 'Science Fiction', 'Thriller']),
  check('review', 'Review is not valid.').exists().notEmpty().isNumeric({ min: 0, max: 5 }),
  check('favorite', 'Favorite is not valid.').exists().notEmpty().isNumeric({ min: 0, max: 1 }),
];

exports.updateBooks = [
  check('title', 'Your title is not valid.').exists().notEmpty().isLength({ min: 3, max: 100 }),
  check('author', 'Author name is not valid.').exists().notEmpty().isLength({ min: 3, max: 50 }),
  check('genre', 'Genre is not valid.').exists().notEmpty().isIn(['Fantasy', 'Literary', 'Mystery', 'Non-Fiction', 'Science Fiction', 'Thriller']),
  check('review', 'Review is not valid.').exists().notEmpty().isNumeric({ min: 0, max: 5 }),
  check('favorite', 'Favorite is not valid.').exists().notEmpty().isNumeric({ min: 0, max: 1 }),
];
