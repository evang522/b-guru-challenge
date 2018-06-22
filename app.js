'use strict';
// ========== Import Dependencies =================>
const express = require('express');
const app = express();
const morgan = require('morgan');
const customerRoute = require('./routes/customer.routes');
const orderRoute = require('./routes/order.routes');
const {
  PORT
} = require('./config');


//=========== Set up JSON Parsing =================>
app.use(express.json());

// =========  Establish Routes ===================>
app.use('/api', customerRoute);
app.use('/api', orderRoute);



// =========== Set up Logger ====================> 
app.use(morgan('common'));



// -==============  Set Up Error Handling ===============>
app.use((err, req, res, next) => {
  const error = new Error();
  error.status = err.status || 500;
  error.message = err.message || 'Internal Server Error';
  res.json(error);
});


// ============  Set up Server ===============>
app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});



module.exports = {
  app
};