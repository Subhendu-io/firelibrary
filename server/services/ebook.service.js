module.exports.getBooks = async (next) => {
  return new Promise(resolve => {
    db.all('SELECT * FROM ebook', [], (err, rows) => {
      if (err) {
        return next(err);
      } else {
        return resolve(rows);
      }
    });
  });
};

module.exports.getBookById = async (ebookId, next) => {
  return new Promise(resolve => {
    db.get('SELECT * FROM ebook WHERE id = ?', [ebookId], (err, rows) => {
      if (err) {
        return next(err);
      } else {
        return resolve(rows);
      }
    });
  });
};

module.exports.createBooks = async (ebook, next) => {
  return new Promise(resolve => {
    db.run('INSERT INTO ebook (title, author, genre, review, favorite) VALUES (?, ?, ?, ?, ?)', ebook, (err, result) => {
      if (err) {
        return next(err);
      } else {
        return resolve(true);
      }
    });
  });
};

module.exports.updateBookById = async (ebookId, ebook, next) => {
  return new Promise(resolve => {
    ebook.push(ebookId);
    db.run(`UPDATE ebook SET title = COALESCE(?, title), author = COALESCE(?, author), genre = COALESCE(?, genre), review = COALESCE(?, review), favorite = COALESCE(?, favorite) WHERE id = ?`, ebook, (err, result) => {
      if (err) {
        return next(err);
      } else {
        return resolve(true);
      }
    });
  });
};

module.exports.deleteBookById = async (ebookId, next) => {
  return new Promise(resolve => {
    db.get('DELETE FROM ebook WHERE id = ?', [ebookId], (err, rows) => {
      if (err) {
        return next(err);
      } else {
        return resolve(rows);
      }
    });
  });
};