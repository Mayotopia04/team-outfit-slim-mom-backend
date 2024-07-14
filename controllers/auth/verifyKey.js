const { httpError } = require("../../helpers");
const { User } = require("../../models");

const verifyKey = async (req, res) => {
  console.log("*******");
  const { key } = req.params;
  const user = await User.findOneAndUpdate(
    { key },
    { verifiedKey: true },
    {
      new: true,
    }
  );
  if (!user) {
    throw httpError(404, "Wrong key");
  } else {
    res.json({
      email: user.email,
      verifiedKey: true,
    });
  }
};

module.exports = verifyKey;
