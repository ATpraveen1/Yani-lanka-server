const express = require('express');
const router = express.Router();

// Import controllers
const { 
    GetDashBoardData,
    GetProductQuantities,
    getmissingproductquantities,
    GetMissingQuantityForDispatch,
    GetFilteredProducts // New function for product filtering
} = require('../Controllers/Dashboard');

const { 
    createBills,
    GetBillingData,
    updateBillings,
    BillingCheckAmount,
    updateBilling,
    deleteBillings
} = require('../Controllers/Billing');

// Define routes
router.post('/create-bill', createBills);
router.get('/get-bill/:query', GetBillingData);
router.post('/update-bills', updateBillings);
router.post('/update-bill', updateBilling);
router.delete('/delete-bill/:id', deleteBillings);
router.post('/dashboard-data', GetDashBoardData);
router.post('/waste-product', GetProductQuantities);
router.get('/get-missing-product-quantities', getmissingproductquantities);
router.get('/get-CheckAmount', BillingCheckAmount);
router.post('/missingQuantitydispatch', GetMissingQuantityForDispatch);

// New route for product filtering
router.post('/filtered-products', GetFilteredProducts);

module.exports = router;
