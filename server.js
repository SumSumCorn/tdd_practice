require('dotenv').config()
const express = require('express');

const PORT = 8081;
const app = express();
const productRoutes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, () => {
    console.log('mongodb connected...')
  });

app.use(express.json());

app.use('/api/products', productRoutes);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message })
})

app.listen(PORT);
console.log('listening on port', PORT);

module.exports = app;