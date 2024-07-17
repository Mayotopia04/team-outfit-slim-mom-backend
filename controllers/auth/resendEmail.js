const { User } = require("../../models/user");
const { httpError} = require("../../helpers");
const { sendEmail} = require("../../helpers");
const { APP_URL = "http://localhost:4000" } = process.env;

const resendEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw httpError(404, "Email not found");
    }

    if (user.verify) {
      throw httpError(400, "Verification has already been passed");
    }

const verificationUrl=`${APP_URL}/api/users/verify/${user?.verificationToken}`;

    const mail = {
      to: email,
      subject: "Slim-Mom verification email",
      html: `
        <h1>Welcome to Slim-mom App!</h1>
        <h3>Please verify your email!</h3>
        <p>Please click to continue</p>
        <div style='text-align:center;'>
          <a href='${verificationUrl}' target='_blank' rel='noopener noreferrer' style='display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px;'>Verify email</a>
        </div>
      `,
    };

    await sendEmail(mail);

    res.json({
      message: "Verification email has been sent",
    });
  } catch (error) {
    next(error); 
  }
};

module.exports = resendEmail;
