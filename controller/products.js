const productModel = require('../models/Product');

exports.createProduct = async (req, res, next) => {
  try{
    const createProduct = await productModel.create(req.body);
    // console.log(createProduct);
    res.status(201).json(createProduct);
  }catch (error) {
    next(error);
  }
}

exports.getProducts = async (req, res, next) => {
  try {
    const allProducts = await productModel.find({});
    res.status(200).json(allProducts);
  }catch (error) {
    next(error);
  }
}