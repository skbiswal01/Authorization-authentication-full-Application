const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./controllers/auth'));
app.use('/api/products', require('./controllers/product'));
module.exports = app;
