import express from 'express';

const updateRation = (connection) => {
  const router = express.Router();

 
  router.post('/update_ration', (req, res) => {
    const { id, title, image, image_big, composition, description, weight, price, composition_full, nutrition_value } = req.body;

    if (!id || !title || !image || !image_big || !composition || !description || !weight || !price || !composition_full || !nutrition_value) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Update the ration with the provided values
    const query = `
      UPDATE rations
      SET title = ?, image = ?, image_big = ?, composition = ?, description = ?, weight = ?, price = ?, composition_full = ?, nutrition_value = ?
      WHERE id = ?
    `;

    connection.query(query, [title, image,image_big,composition, description, weight, price, composition_full, nutrition_value, id], (err, results) => {
      if (err) {
        console.error('Error updating ration:', err);
        return res.status(500).json({ error: 'Database update failed' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Ration not found' });
      }

      res.status(200).json({ message: 'Ration updated successfully' });
    });
  });

  return router;
};

export default updateRation;
