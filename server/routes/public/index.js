const express = require('express');
const router = express.Router();

const appController = require('../../controllers/app.controller');
const eBookController = require('../../controllers/ebook.controller');

const eBookValidator = require('../../validators/ebook.validator');

router.get('/', appController.hello);
router.get('/ebooks', eBookController.getBooks);
router.get('/ebooks/:id', eBookController.getBookById);
router.post('/ebooks', eBookValidator.createBooks, eBookController.createBooks);
router.put('/ebooks/:id', eBookValidator.updateBooks, eBookController.updateBookById);
router.delete('/ebooks/:id', eBookController.deleteBookById);

module.exports = router;