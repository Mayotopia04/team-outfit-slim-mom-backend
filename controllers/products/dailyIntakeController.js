const { Product } = require("../../models");
const { httpError } = require("../../helpers");

const dailyIntakeController = async (req, res, next) => {
  const { age, height, currentWeight, desiredWeight, bloodType } = req.body;

  const dailyCaloriesCalculate =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight);

  const result = await Product.find(
    {
      [`groupBloodNotAllowed.${bloodType}`]: true,
    },
    {
      title: `$title`,
      categories: `$categories`,
    }
  );

  if (!result) {
    throw httpError(404, "Not found");
  }

  const productCategories = result
    .flatMap((product) => product.categories)
    .filter((item, index, array) => array.indexOf(item) === index);

  const dailyIntake = {
    calories: dailyCaloriesCalculate.toFixed(),
    notAllowedProduct: result.map(
      ({ title = "Sorry we don`t find that title", categories }) => ({
        title,
        category: categories[0],
      })
    ),
    categories: productCategories,
  };

  res.json(dailyIntake);
};

module.exports = dailyIntakeController;
