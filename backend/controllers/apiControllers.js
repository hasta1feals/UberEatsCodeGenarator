const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/mydb.sqlite');



const insertApi = (req, res) => {
  const { api_key } = req.body;
  const { id_user } = req.params; // Extract id_user from URL parameters
  
  if (!api_key || !id_user) {
    return res.status(400).json({ message: 'Missing api_key or id_user' });
  }

  const sql = 'UPDATE api SET api_key = ? WHERE id_user = ?';

  db.run(sql, [api_key, id_user], function (err) {
    if (err) {
      console.error('Error updating api_key:', err.message);
      return res.status(500).json({ message: 'Error updating api_key' });
    } else if (this.changes === 0) {
      console.log('No row updated, possibly because the user ID does not exist.');
      return res.status(404).json({ message: 'User ID not found' });
    } else {
      console.log('Api key updated successfully.');
      return res.status(200).json({ message: 'Api key updated successfully' });
    }
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
