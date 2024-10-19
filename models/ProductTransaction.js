const mongoose = require('mongoose');

const productTransactionSchema = new mongoose.Schema({
    productId: String,
    title: String,
    description: String,
    price: Number,
    dateOfSale: Date,
    category: String,
    sold: Boolean
});

module.exports = mongoose.model('ProductTransaction', productTransactionSchema);
