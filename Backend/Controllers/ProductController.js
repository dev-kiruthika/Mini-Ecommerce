const productModel = require("../Models/productModel");

//Get Products API - /api/v1/products
exports.getProducts = async (req, res, next) => {
  let query = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await productModel.find(query);

  res.json({
    success: true,
    products,
  });
};

//Get Single Products API - /api/v1/products/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const product = await productModel.findById(req.params.id);

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Unable to get Product with that",
    });
  }
};
