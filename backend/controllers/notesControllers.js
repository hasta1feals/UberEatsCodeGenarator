const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/mydb.sqlite');



const createNotes = (req, res) => {
    const { subject, text , id_user} = req.body;
    db.run('INSERT INTO notes (subject, text, id_user) VALUES (?, ?,?)', [subject, text, id_user], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "succes", id: this.lastID });
    });
  };



  const getNotes = (req, res) => {
    const id_user = req.params.id_user;
    db.all('SELECT * FROM notes where id_user = ? ', [id_user], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  };

  module.exports = {

    createNotes,
    getNotes

  }
