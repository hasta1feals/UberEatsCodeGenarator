const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/mydb.sqlite');



const insertApi = (req, res) => {
    const { api_key , id_user} = req.body;
    db.run('INSERT INTO api (api_key, id_user) VALUES (?, ?)', [api_key, id_user], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "succes", id: this.lastID });
    });
  };



  const getApi = (req, res) => {
    const id_user = req.params.id_user;
    db.all('SELECT * FROM api where id_user = ? ', [id_user], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  };

  module.exports = {

    getApi,
    insertApi

  }
