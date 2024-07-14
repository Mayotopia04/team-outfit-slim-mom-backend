const { DailyNutrition } = require("../../models");
const { httpError } = require("../../helpers");

const getDailyMeals = async (req, res) => {
  const { _id } = req.user;
  const { date } = req.body;
  const result = await DailyNutrition.find({ owner: _id, date });
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getDailyMeals;
