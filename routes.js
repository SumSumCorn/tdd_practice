const express = require('express');
const router = express.Router()
const {hello} = require('./controller/products')

router.get('/', hello);

module.exports = router;