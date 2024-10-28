const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

/* Rutas y errorHandler */
/* const routes = require('../routes/')
const errorHandler = require('../middlewares/errorHandler') */

dotenv.config();

const app = express();


//Middleware
app.use(cors());
app.use(express.json());

//Connect to database
connectDB();

//Routes
app.get('/', (req, res) => {
    res.send('Chat App Ws is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

