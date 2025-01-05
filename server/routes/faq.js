import express from 'express';

const faqRoutes = (connection) => {
  const router = express.Router();


  router.get('/faq', (req, res) => {
    connection.query('SELECT * FROM faq', (err, results) => {
      if (err) {
        console.error('Error fetching FAQs:', err);
        return res.status(500).send('Error fetching FAQs');
      }
      res.json(results);
    });
  });

  return router;
};

export default faqRoutes;
