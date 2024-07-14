

const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");

const { httpError } = require("../../helpers");

const { createTokens } = require("../../helpers");

const { SECRET_KEY} = process.env; 

const refresh = async (req, res) => {
  try {
    const { refreshToken: token } = req.body;

    const { id } = jwt.verify(JSON.parse(token), SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.refreshToken) {
      throw httpError(401);
    }

    const { accessToken, refreshToken } = await createTokens(id);

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    if (!error.status) {
      error.status = 401;
    }
    throw error;
  }
};

module.exports = refresh;
