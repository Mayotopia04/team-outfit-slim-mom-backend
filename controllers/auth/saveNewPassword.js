const bcrypt = require("bcryptjs");
const { httpError } = require("../../helpers");
const { User } = require("../../models");

const saveNewPassword = async (req, res) => {
  const { password, email } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.findOneAndUpdate(
    { email, verifiedKey: true },
    {
      password: hashPassword,
      key: "",
      verifiedKey: false,
    },
    {
      new: true,
    }
  );
  if (!result) {
    throw httpError(404, "Not found user");
  }
  res.json({ message: "New password saved" });
};

module.exports = saveNewPassword;
