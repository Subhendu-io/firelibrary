var sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('firelibrary.sqlite', (err) => {
  if (err) {
    throw err
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE ebook (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      author TEXT,
      genre TEXT,
      review INTEGER,
      favorite INTEGER
    )`,
    (err) => {
      if (!err) {
        const insert = `INSERT INTO ebook (title, author, genre, review, favorite) VALUES (?, ?, ?, ?, ?)`;
        const books = ['Absalom, Absalom!', 'A Time to Kill', 'The House of Mirth', 'East of Eden', 'The Sun Also Rises', 'Vile Bodies', 'A Scanner Darkly', 'Moab is my Wash pot', 'A Passage to India', 'Macbeth'];
        const authors = ['John Grisham', 'Edith Wharton', 'John Steinbeck', 'Ernest Hemingway', 'Evelyn Waugh', 'Philip', 'Stephen Fry', 'Bram Stoker', 'William Shakespeare', 'James Joyce'];
        const genres = ['Fantasy', 'Literary', 'Mystery', 'Non-Fiction', 'Science Fiction', 'Thriller'];
        for (let index = 0; index < 10; index++) {
          db.run(insert, [books[index], authors[index], genres[Math.floor(Math.random() * 6)], Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 2)]);
        }
      }
    });
  }
});

module.exports = db;