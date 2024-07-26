const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    ProductID: {
        type: String,
        required: true,
        unique: true
    },
    ProductName: {
        type: String,
        required: true
    },
    QuantityType: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model("FarmInventory", schema, "FarmInventory");
