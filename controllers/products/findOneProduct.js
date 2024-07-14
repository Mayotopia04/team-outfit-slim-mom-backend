const { Product } = require("../../models");
const { httpError } = require("../../helpers");

const findOneProduct = async (req, res) => {
  const { product } = req.params;
  const result = await Product.find(
    { "title": { $regex: product, $options: "i" } },
    { title: "$title", weight: 1, calories: 1 }
  );

  if (result.length < 1) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

module.exports = findOneProduct;
