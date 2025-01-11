import express from 'express';


const router = express.Router();

const placeOrder = (connection) => {
    router.post('/orders', async (req, res) => {
        const {
            ration_id,
            name,
            phone_number,
            address,
            ration_size,
            quantity,
            price,
        } = req.body;

        // Validate the required fields
        if (
            !ration_id ||
            !name ||
            !phone_number ||
            !address ||
            !ration_size ||
            !quantity ||
            !price
        ) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        try {
            // Insert the order into the database
            const sql = `
                INSERT INTO orders 
                (ration_id, name, phone_number, address, ration_size, quantity, price) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                ration_id,
                name,
                phone_number,
                address,
                ration_size,
                quantity,
                price,
            ];
            await connection.promise().query(sql, values);

            res.status(201).json({ message: 'Order created successfully!' });
        } catch (error) {
            console.error('Error inserting order:', error);
            res.status(500).json({ error: 'Failed to create order.' });
        }
    });

    return router;
};

export default placeOrder;
