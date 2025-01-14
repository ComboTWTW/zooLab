import express from 'express';

const rationsRoutes = (connection) => {
  const router = express.Router();

  router.get('/rations', (req, res) => {
    connection.query('SELECT * FROM rations WHERE deleted = FALSE', (err, results) => {
      if (err) {
        console.error('Error fetching rations:', err);
        return res.status(500).send('Error fetching rations');
      }
      res.json(results);
    });
  });

  return router;
};

export default rationsRoutes;
