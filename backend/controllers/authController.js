const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/mydb.sqlite');

// JWT secret key (in production, use an environment variable)
const JWT_SECRET = process.env.JWT_SECRET;

// Function to register a new user with a hashed password
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Error while hashing password' });
  }
};

// Function to login user and issue JWT
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    // Fetch the user from the database based on the provided email
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the password matches
      try {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          // Generate and send JWT token (if required)
          const token = jwt.sign({ id: user.id, email: user.email  }, process.env.JWT_SECRET, { expiresIn: '1h' });
          console.log("Generated token:", token);

  
          res.status(200).json({ message: 'Login successful', token });
        } else {
          res.status(400).json({ message: 'Incorrect password' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error during password verification' });
      }
    });
  };
  

module.exports = {
  registerUser,
  loginUser,
  
};
