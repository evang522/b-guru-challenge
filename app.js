// ========== Import Dependencies =================>
const express = require('express');
const app = express();
const morgan = require('morgan');
const customerRoute = require('./routes/customer.routes');
const orderRoute = require('./routes/order.routes');
const {PORT} = require('./config');


// =========  Establish Routes ===================>
app.use('/api', customerRoute);
app.use('/api', orderRoute);



// =========== Set up Logger ====================> 
app.use(morgan('common'));



// ============  Set up Server ===============>
app.listen(PORT, () => {
    console.log(`App listening on ${PORT}`);
})



module.exports = {
    app
}