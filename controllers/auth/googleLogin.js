const { User } = require("../../models");
const { httpError } = require("../../helpers");
const { createTokens } = require("../../helpers");
const axios = require("axios");

const googleLogin = async (req, res) => {
    const { googleAccessToken } = req.body;

    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAccessToken}`, {
        headers: {
            Authorization: `Bearer ${googleAccessToken}`,
            Accept: 'application/json',
        },
    });
    const email = response.data.email;

    const user = await User.findOne({ email });
    if (!user) {
        throw httpError(401, "Current email is not registered");
    }

    const { accessToken, refreshToken } = await createTokens(user._id);

    res.json({
        accessToken,
        refreshToken,
        user: { email: user.email, name: user.name },
        dailyDiet: user.dailyDiet,
    });
};

module.exports = googleLogin;
