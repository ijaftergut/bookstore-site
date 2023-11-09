const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');

app.use('/products', require('./products'));
app.use('/ranking', require('./ranking'));
app.use('/', require('./auth'));
app.use('/topten', require('./topten'));
app.use('/users', require('./users'))
app.use('/home', require('./home'))
module.exports = app;
