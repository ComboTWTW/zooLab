import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (connection) => {
  const router = express.Router();

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username + " " + password);

    // Check if the user exists
    connection.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        return res.status(500).send('Server error');
      }

      if (results.length === 0) {
        return res.status(400).send('User not found');
      }

      const user = results[0];

      // Compare the password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send('Invalid credentials');
      }

      // Create a JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        `${process.env.JWT_KEY}`, // Replace with your secret
        { expiresIn: '1h' }
      );

      // Send the token to the client
      res.json({ token });
    });
  });

  return router; 
};

export default auth;
