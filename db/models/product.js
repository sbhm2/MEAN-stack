const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;