const { DailyNutrition, Product } = require("../../models");
const { httpError } = require("../../helpers");

const addMeal = async (req, res) => {
  const { _id: owner } = req.user;
  const { product, grams } = req.body;
  const { calories } = await Product.findOne({ "title": product });
  if (!calories) {
    throw httpError(404, "This product does not exist in the database");
  }
  const cal = ((grams * calories) / 100).toFixed();
  const result = await DailyNutrition.create({
    ...req.body,
    calories: cal,
    owner,
  });
  res.status(201).json(result);
};

module.exports = addMeal;
