import express from 'express';

const deleteRation = (connection) => {
  const router = express.Router();

  // Route to delete (mark as deleted) a ration by id
  router.post('/delete_ration', (req, res) => {
    const { id } = req.body;  // Get ration id from the request body

    if (!id) {
      return res.status(400).json({ error: 'Ration ID is required' });
    }

    // Update the deleted field to true for the given ration id
    const query = `
      UPDATE rations
      SET deleted = TRUE
      WHERE id = ?
    `;

    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error updating ration:', err);
        return res.status(500).json({ error: 'Database update failed' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Ration not found' });
      }

      res.status(200).json({ message: 'Ration marked as deleted successfully' });
    });
  });

  return router;
};

export default deleteRation;
