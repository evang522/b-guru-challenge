'use strict';
// ============ Import Dependencies =============>
const Company = require('./utils/Company');
const Orders = require('./utils/Orders.json');
const BorderGuru = new Company(Orders);


module.exports = BorderGuru;