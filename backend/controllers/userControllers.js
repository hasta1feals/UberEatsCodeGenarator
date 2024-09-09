const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/mydb.sqlite');

// Function to fetch all users from the database
const getAllUsers = (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};



const test = (req, res) => {
  res.json({ message: "hallo" });
};


// Function to fetch a user by ID
const getUserById = (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(row);
  });
};

// Function to add a new user
const createUser = (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
};

// Function to update a user
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.run(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: `User with id ${id} updated successfully.` });
    }
  );
};

const intTest = (req, res) => {
  
      res.json({ message: `test` });
    
};
// Function to delete a user
const deleteUser = (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: `User with id ${id} deleted successfully.` });
  });
};

module.exports = {
    intTest,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  test
};
