const UserFarmInventory = require('../Models/UserFarmInventory');

// User creates a Farm Inventory data
exports.createUserFarmInventory = async (req, res) => {
    try {
        const { ProductID, ProductName, QuantityType, Quantity, UserID } = req.body;
        const quantity = parseInt(Quantity, 10);

        let product = await UserFarmInventory.findOne({ ProductID, UserID, Price });
        if (!product) {
            const data = { ProductID, ProductName, QuantityType, Quantity: quantity, UserID };
            UserFarmInventory.create(data)
                .then(() => res.status(201).json({ message: 'Data Farm Inventory Created Successfully', isSuccess: true }))
                .catch(err => res.status(500).json({ error: err, message: 'Error in database' }));
        } else {
            product.Quantity += quantity;
            await product.save();
            res.status(200).json({ message: 'Quantity updated successfully', isSuccess: true });
        }
    } catch (err) {
        res.status(500).json({ error: err, message: 'Internal server Error' });
    }
};

// Get User Farm Inventory Data
exports.GetUserFarmInventoryData = (req, res) => {
    UserFarmInventory.find({ UserID: req.params.id })
        .then(result => res.status(201).json({ message: "Get Farm Inventory Data Successfully", data: result }))
        .catch(err => res.status(500).json({ error: err, message: "Error in database" }));
};

// Update User Farm Inventory
exports.UpdateUserFarmInventory = async (req, res) => {
    const { id, usedQuantity } = req.body;
    try {
        const product = await UserFarmInventory.findOne({ _id: id });
        if (product) {
            const updatedQuantity = product.Quantity - usedQuantity;
            if (updatedQuantity >= 0) {
                await UserFarmInventory.updateOne({ _id: id }, { $set: { Quantity: updatedQuantity } });
                res.status(200).json({ message: `Updated quantity ${updatedQuantity}`, isSuccess: true });
            } else {
                res.status(400).json({ error: `Not enough quantity available` });
            }
        } else {
            res.status(404).json({ error: `Product not found in the database` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
