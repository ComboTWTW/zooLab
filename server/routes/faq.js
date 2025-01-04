import express from 'express';
import connection from '../config/db.js';

const router = express.Router();

router.get('/faq', (req, res) => {
  connection.query('SELECT * FROM faq', (err, results) => {
    if (err) {
      console.error('Error fetching rations:', err);
      res.status(500).send('Error fetching rations');
    } else {
      res.json(results);
    }
  });
});



export default router;
