const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

/* Lectura y carga de las variables al 'process.env'  */
dotenv.config({ path: '../.env'});
console.log(dotenv.config());

