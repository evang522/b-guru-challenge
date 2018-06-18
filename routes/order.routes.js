// ================ Import Dependencies =============>
const express = require('express');
const router = express.Router();
const BorderGuru = require('../DBconfig');

router.get('/hi', (req,res,next) => {
    console.log('BEFORE');
    const err = new Error();
    err.status = 400;
    err.message = 'You did a bad';
    return next(err);
    console.log('AFTER');
})



// ================= GET all orders ===============>
router.get('/order', (req,res,next) => {
    let orderList = BorderGuru.returnAll();

    if (!req.query) {
        return res.json(orderList);
    }

    if (req.query.address) {
        const list = BorderGuru.getAllOrdersByAddress(req.query.address);
        if (!list.length) {
            const err = new Error();
            err.status = 404;
            err.message = 'No Orders found with this Address';
            return next(err);
        }
        return res.json(list);
    }

    if (req.query.customer) {
        const {customer} = req.query;
        const list = BorderGuru.getAllOrdersByCustomer(customer);
        if (!list.length) {
            const err = new Error();
            err.status = 404;
            err.message = 'No Orders found for this Customer';
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


router.post('/order', (req,res,next) => {
    let runningError;
    const acceptedFields = ['Customer Name','Customer Address','Item Name','Price','Currency'];
    const newItem = {};

    //Validation
    if (!req.body) {
        const err = new Error();
        err.message = 'Missing required fields. Read: The entire request body is missing!';
        err.status = 400;
        return next(err);
    }

    acceptedFields.forEach(field => {
        if (!req.body[field]) {
            console.log('there was an Error');
            const err = new Error();
            err.status = 400;
            err.message = `Missing ${field} field`;
            runningError = err;
             next(err);
        }
        newItem[field] = req.body[field];
    })



    const createdItem = BorderGuru.addNewOrder(newItem['Customer Name'], newItem['Customer Address'], newItem['Item Name'], newItem['Price'], newItem['Currency']);
    res.status(200).json(createdItem);
})


module.exports = router;