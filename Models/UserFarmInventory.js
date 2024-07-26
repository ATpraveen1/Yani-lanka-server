const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ProductID: {
        type: String,
        required: true
    },
    ProductName: {
        type: String,
        required: true
    },
    QuantityType: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model("UserFarmInventory", schema, "UserFarmInventory");
