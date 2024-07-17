const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { v4: uuidv4 } = require("uuid");

const { httpError, sendEmail } = require("../../helpers");

const { APP_URL = "https://team-outfit-slim-mom-backend.onrender.com" } = process.env;


const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.verify || existingUser && !existingUser.verify)  {
      throw httpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    await newUser.save();
    const verificationUrl=`${APP_URL}/api/users/verify/${verificationToken}`;
  
    const mail = {
      to: email,
      subject: "Slim-Mom verification email",
      Vars: {
        link: verificationUrl,
      },
      html: `
        <h1>Welcome to Slim-mom App!</h1>
        <h3>Please verify your email!</h3>
        <p>Please click verify button to continue.</p>
        <div style='text-align:left;'>
          <a href='${verificationUrl}' target='_blank' rel='noopener noreferrer' style='display: inline-block; padding: 10px 20px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px;'>Verify email</a>
        </div>
      `,
    };

    await sendEmail(mail);

    res.status(201).json({
      user: { name: newUser.name, email: newUser.email },
      message: "Account created successfully",
    });
  } catch (error) {
    next(error); 
  }
};

module.exports = register;
