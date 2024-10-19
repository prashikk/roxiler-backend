const express = require('express');
const mongoose = require('mongoose');
const initializeRoutes = require('./routes/initialize');
const transactionRoutes = require('./routes/transactions');
const statisticsRoutes = require('./routes/statistics');
const chartsRoutes = require('./routes/charts');
const combinedRoutes = require('./routes/combined');

const app = express();

mongoose.connect('mongodb://localhost:27017/productsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/initialize', initializeRoutes);
app.use('/transactions', transactionRoutes);
app.use('/statistics', statisticsRoutes);
app.use('/charts', chartsRoutes);
app.use('/combined', combinedRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
