const { validationResult } = require('express-validator');
const ebookService = require('../services/ebook.service');

module.exports.getBooks = async (req, res, next) => {
  try {
    const ebooks = await ebookService.getBooks(next);
    return res.send({
      success : true,
      data    : ebooks,
      title   : 'All ebooks!',
      message : 'All ebooks sent successfully.',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports.getBookById = async (req, res, next) => {
  try {
    const ebookId = req.params.id;
    const ebook = await ebookService.getBookById(ebookId, next);
    return res.send({
      success : true,
      data    : ebook,
      title   : 'EBook sent!',
      message : 'EBook sent successfully.',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports.createBooks = async (req, res, next) => {
  try {
    _request = req.body;
    const _errors = validationResult(req);
    if(!_errors.isEmpty()) {
      return next(_errors);
    } else {
      const ebook = [];
      for (const field in _request) {
        ebook.push(_request[field]);
      }
      const result = await ebookService.createBooks(ebook, next);
      return res.send({
        success : true,
        data    : result,
        title   : 'All ebooks!',
        message : 'All ebooks sent successfully.',
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports.updateBookById = async (req, res, next) => {
  try {
    const _request = req.body;
    const ebookId = req.params.id;

    const ebook = [];
    for (const field in _request) {
      if (field !== 'id') {
        ebook.push(_request[field]);
      }
    }
    const result = await ebookService.updateBookById(ebookId, ebook, next);
    return res.send({
      success : true,
      data    : result,
      title   : 'EBook updated!',
      message : 'EBook updated successfully.',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports.deleteBookById = async (req, res, next) => {
  try {
    const ebookId = req.params.id;
    const result = await ebookService.deleteBookById(ebookId, next);
    return res.send({
      success : true,
      data    : result,
      title   : 'EBook deleted!',
      message : 'EBook deleted successfully.',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};