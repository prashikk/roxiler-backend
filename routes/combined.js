const express = require('express');
const router = express.Router();
const ProductTransaction = require('../models/ProductTransaction');
const fetchTransactions = require('./transactions'); 
const fetchStatistics = require('./statistics');      
const fetchBarChart = require('./charts');           
const fetchPieChart = require('./charts');           

router.get('/combined', async (req, res) => {
    const { month } = req.query;

    try {
        const [transactions, statistics, barChart, pieChart] = await Promise.all([
            fetchTransactions(month),
            fetchStatistics(month),
            fetchBarChart(month),
            fetchPieChart(month)
        ]);

        res.json({
            transactions,
            statistics,
            barChart,
            pieChart
        });
    } catch (error) {
        res.status(500).send('Error combining data: ' + error.message);
    }
});

module.exports = router;
