const express = require('express');
const router = express.Router();
const ProductTransaction = require('../models/ProductTransaction');

router.get('/bar-chart', async (req, res) => {
    const { month } = req.query;

    const startDate = new Date(`2022-${month}-01`);
    const endDate = new Date(`2022-${parseInt(month) + 1}-01`);

    try {
        const priceRanges = {
            '0-100': 0,
            '101-200': 0,
            '201-300': 0,
            '301-400': 0,
            '401-500': 0,
            '501-600': 0,
            '601-700': 0,
            '701-800': 0,
            '801-900': 0,
            '901-above': 0
        };

        const transactions = await ProductTransaction.find({
            dateOfSale: { $gte: startDate, $lt: endDate }
        });

        transactions.forEach(transaction => {
            const price = transaction.price;
            if (price <= 100) priceRanges['0-100']++;
            else if (price <= 200) priceRanges['101-200']++;
            else if (price <= 300) priceRanges['201-300']++;
            else if (price <= 400) priceRanges['301-400']++;
            else if (price <= 500) priceRanges['401-500']++;
            else if (price <= 600) priceRanges['501-600']++;
            else if (price <= 700) priceRanges['601-700']++;
            else if (price <= 800) priceRanges['701-800']++;
            else if (price <= 900) priceRanges['801-900']++;
            else priceRanges['901-above']++;
        });

        res.json(priceRanges);
    } catch (error) {
        res.status(500).send('Error generating bar chart data: ' + error.message);
    }
});

router.get('/pie-chart', async (req, res) => {
    const { month } = req.query;

    const startDate = new Date(`2022-${month}-01`);
    const endDate = new Date(`2022-${parseInt(month) + 1}-01`);

    try {
        const categories = await ProductTransaction.aggregate([
            {
                $match: {
                    dateOfSale: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: '$category',
                    itemCount: { $sum: 1 }
                }
            }
        ]);

        res.json(categories);
    } catch (error) {
        res.status(500).send('Error generating pie chart data: ' + error.message);
    }
});

module.exports = router;
