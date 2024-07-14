const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET_KEY } = process.env;

const createTokens = async (id) => {
  const payload = {
    id,
  };

  const accessToken = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "7d",
  });
  await User.findByIdAndUpdate(id, { accessToken, refreshToken });

  return { accessToken, refreshToken };
};

module.exports = createTokens;
