// ================ Import Dependencies =============>
const express = require('express');
const router = express.Router();
const BorderGuru = require('../DBconfig');



// ================= GET all orders ===============>
router.get('/order', (req,res,next) => {
    console.log(req.query);
    if (!req.query) {
        return res.json(BorderGuru.returnAll());
    }

    if (req.query.address) {
        console.log(req.query.address);
        const list = BorderGuru.getAllOrdersByAddress(req.query.address);
        if (!list) {
            const err = new Error();
            err.status = 404;
            err.message = 'No Orders found with this Address';
            return next(err);
        }
        return res.json(list);
    }

    });

// ================ GET Order by ID ====================>
router.get('/order/:id', (req,res,next) => {
    const {id} = req.params;

    const order = BorderGuru.getOrderById(id);
    if (!order) {
        const err = new Error();
        err.message = 'No order with provided ID';
        err.status = 404;
        return next(err);
    }

    res.json({order})
})















module.exports = router;