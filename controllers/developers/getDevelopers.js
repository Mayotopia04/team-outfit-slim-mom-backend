const { Developer } = require("../../models");
const { httpError } = require("../../helpers");

const getDevelopers = async (_, res) => {
  const result = await Developer.find({});
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getDevelopers;
