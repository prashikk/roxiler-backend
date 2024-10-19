const express = require('express');
const router = express.Router();
const axios = require('axios');
const ProductTransaction = require('../models/ProductTransaction');

router.get('/initialize', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;

        await ProductTransaction.insertMany(data.map(item => ({
            productId: item.productId,
            title: item.title,
            description: item.description,
            price: item.price,
            dateOfSale: new Date(item.dateOfSale),
            category: item.category,
            sold: item.sold
        })));

        res.status(200).send('Database initialized with seed data');
    } catch (error) {
        res.status(500).send('Error fetching or seeding data: ' + error.message);
    }
});

module.exports = router;
