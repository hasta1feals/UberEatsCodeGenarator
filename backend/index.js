const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import the user routes
const authRoutes = require('./routes/authRoutes'); // Import the auth routes
const notesRoutes = require('./routes/notesRoutes'); // Import the notes routes

require('dotenv').config();

const app = express();
const port = 3000;

const corsOptions = {
  origin: '*', // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
  allowedHeaders: 'Content-Type,Authorization', // Allow these headers
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Replaces body-parser

// Use the routes
app.use(userRoutes);
app.use(authRoutes);
app.use(notesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
