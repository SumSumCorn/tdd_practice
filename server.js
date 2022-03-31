const express = require('express');

const PORT = 8081;
const app = express();
const productRoutes = require('./routes');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://catch22:zcb135@test1.qeunp.mongodb.net/testdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=> console.log('mongodb connected...')
  ).catch((err)=> console.log(err))

app.use(express.json());

app.use('/api/products', productRoutes);

app.listen(PORT);
console.log('listening on port', PORT);