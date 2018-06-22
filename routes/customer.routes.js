'use strict';
// =============== Import Dependencies ===============> 
const express = require('express');
const router = express.Router();


router.get('/hello', (req,res,next) => {
  res.send('hello!');
});














module.exports = router;
