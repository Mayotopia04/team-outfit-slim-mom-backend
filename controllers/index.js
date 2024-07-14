const register = require("./auth/register");
const login = require("./auth/login");
const googleLogin = require("./auth/googleLogin");
const logout = require("./auth/logout");
const refresh = require("./auth/refresh");
const getCurrentUser = require("./auth/getCurrentUser");
const sendKey = require("./auth/sendKey");
const verifyKey = require("./auth/verifyKey");
const saveNewPassword = require("./auth/saveNewPassword");
const resendEmail = require("./auth/resendEmail");
const verifyEmail = require("./auth/verifyEmail");

const addMeal = require("./dailyNutritions/addMeal");
const removeMeal = require("./dailyNutritions/removeMeal");
const getDailyMeals = require("./dailyNutritions/getDailyMeals");

const findOneProduct = require("./products/findOneProduct");
const dailyIntakeController = require("./products/dailyIntakeController");
const dailyIntakeControllerForUser = require("./products/dailyIntakeControllerForUser");

const getDevelopers = require("./developers/getDevelopers");


module.exports = {
  register,
  login,
  googleLogin,
  logout,
  refresh,
  getCurrentUser,
  findOneProduct,
  addMeal,
  removeMeal,
  getDailyMeals,
  dailyIntakeController,
  dailyIntakeControllerForUser,
  getDevelopers,
  sendKey,
  verifyKey,
  saveNewPassword,
  resendEmail,
  verifyEmail,
};
