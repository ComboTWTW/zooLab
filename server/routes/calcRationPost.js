import express from 'express';
import connection from '../config/db.js';

const router = express.Router();

router.post('/calc_ration', (req, res) => {
  const { size, weight, age, name, tel_number, question } = req.body;

  if (!size || !weight || !age || !name || !tel_number) {
    return res.status(400).json({ error: 'Name and question are required fields' });
  }

  const query = `
    INSERT INTO calc_ration (size, weight, age, name, tel_number, question)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, [size, weight, age, name, tel_number, question], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Database insertion failed' });
    }
    res.status(201).json({ message: 'Question added successfully', id: results.insertId });
  });
});

export default router;
