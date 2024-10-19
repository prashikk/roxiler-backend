const express = require('express');
const router = express.Router();
const ProductTransaction = require('../models/ProductTransaction');

router.get('/statistics', async (req, res) => {
    const { month } = req.query;

    const startDate = new Date(`2022-${month}-01`);
    const endDate = new Date(`2022-${parseInt(month) + 1}-01`);

    try {
        const soldItems = await ProductTransaction.countDocuments({
            sold: true,
            dateOfSale: { $gte: startDate, $lt: endDate }
        });

        const notSoldItems = await ProductTransaction.countDocuments({
            sold: false,
            dateOfSale: { $gte: startDate, $lt: endDate }
        });

        const totalSales = await ProductTransaction.aggregate([
            {
                $match: {
                    sold: true,
                    dateOfSale: { $gte: startDate, $lt: endDate }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$price' }
                }
            }
        ]);

        res.json({
            totalSaleAmount: totalSales[0]?.totalAmount || 0,
            totalSoldItems: soldItems,
            totalNotSoldItems: notSoldItems
        });
    } catch (error) {
        res.status(500).send('Error fetching statistics: ' + error.message);
    }
});

module.exports = router;
