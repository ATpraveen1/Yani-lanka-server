const FarmInventory = require('../Models/FarmInventory');
const UserFarmInventory  = require('../Models/UserFarmInventory');

// Function to generate a random alphanumeric string with 4 digits
function generateShortId() {
    const characters = '0123456789';
    let shortId = 'FI';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        shortId += characters.charAt(randomIndex);
    }
    return shortId;
}

// Admin creates a FarmInventory Data
exports.createFarmInventory = (req, res) => {
    const { ProductName, QuantityType, Price } = req.body;
    if (!ProductName || !QuantityType || !Price) return res.status(404).json({ message: "Please Fill Details" });

    const uniqueShortId = generateShortId();
    const data = { ProductID: uniqueShortId, ProductName, QuantityType, Price };

    FarmInventory.create(data)
        .then(() => res.status(201).json({ message: "Data Farm Inventory Created Successfully", isSuccess: true }))
        .catch(err => res.status(500).json({ error: err, message: "Error in database" }));
};

// Get Farm Inventory Data
exports.GetFarmInventoryData = async (req, res) => {
    try {
        const farmInventoryProducts = await FarmInventory.find();
        const result = await Promise.all(farmInventoryProducts.map(async (farmProduct) => {
            const userInventoryEntries = await UserFarmInventory.find({ ProductID: farmProduct.ProductID });
            const totalQuantity = userInventoryEntries.reduce((total, entry) => total + entry.Quantity, 0);
            return { ...farmProduct._doc, TotalQuantity: totalQuantity };
        }));
        res.status(200).json({ message: "Get Farm data Successfully", data: result });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Update Farm Inventory
exports.updateFarmInventory = (req, res) => {
    const { id, ProductName, QuantityType, ProductID, Price } = req.body;
    if (!id || !ProductName || !QuantityType || !ProductID || !Price) return res.status(404).json({ message: "Something went wrong" });

    FarmInventory.updateOne({ _id: id }, req.body)
        .then(result => res.status(200).json({ message: "Document Updated Successfully", data: result, isSuccess: true }))
        .catch(err => res.status(500).json({ message: "Error in database", error: err }));
};

// Delete Product
exports.deleteproduct = (req, res) => {
    FarmInventory.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Delete Product Successfully", isSuccess: true }))
        .catch(err => res.status(500).json({ message: "Error in database", error: err, isSuccess: false }));
};
