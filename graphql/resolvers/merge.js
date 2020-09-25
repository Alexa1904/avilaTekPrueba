const Product = require("../../models/products");
const Founder = require("../../models/founders");

const transformProduct = (product) => {
  return {
    ...product._doc,
    _id: product.id,
    releaseDate: new Date(product._doc.releaseDate).toISOString(),
    founder: founder.bind(this, product.founder),
  };
};

const products = (productIds) => {
  return Product.find({ _id: { $in: productIds } })
    .then((products) => {
      return products.map((product) => {
        return transformProduct(product);
      });
    })
    .catch((err) => {
      throw err;
    });
};

const founder = (founderId) => {
  return Founder.findById(founderId)
    .then((founder) => {
      return {
        ...founder._doc,
        _id: founder.id,
        createdProducts: products.bind(this, founder._doc.createdProducts),
        votedProducts: products.bind(this, founder._doc.votedProducts),
      };
    })
    .catch((err) => {
      throw err;
    });
};

exports.founder = founder;
exports.products = products;
exports.transformProduct = transformProduct;
