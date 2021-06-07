const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//routes
const logRoutes = require('./routes/user');
const tableauRoutes = require('./routes/tableau');
const orderRoutes = require('./routes/order');
const adminRoutes = require('./routes/admin');
const eventRoutes = require('./routes/event');

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit : "50mb"}));//body parser pour convertir les objets JSON des requêtes POST
app.use(express.json({limit : "50mb"}));
app.use('/tmp', express.static(path.join(__dirname, 'tmp')));


//PAYPAL 
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AfUNhcAFNLNpWB25CSPSDseNp0TDRQ5v2CakliBr3BOa8WkjDQ0y32tRQBEHncbWtV2J3bRvdywYJG9R',
    'client_secret': 'ELRIqKIJuRk0gEEABwYcOxSTuNBC622Y7c_ipPgYcfyCs3HG7AyJ-4mX0FQdCwe288ZyI-NcyQGolpa4'
  });

//END OF PAYPAL
app.use('/api/', logRoutes);
app.use('/api/', tableauRoutes);
app.use('/api/', orderRoutes);
app.use('/api/', adminRoutes);
app.use('/api/', eventRoutes);

module.exports = app;