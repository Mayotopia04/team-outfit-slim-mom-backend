const {
    registerSchema,
    loginSchema,
    googleLoginSchema,
    refreshSchema,
    passwordSchema,
    resendEmailSchema,
} = require("./user");

const { mealSchema, dailyMealsSchema } = require("./dailyNutrition");
const { dailyIntakeJoiSchema } = require("./dailyIntakeJoiSchema");

module.exports = {
    registerSchema,
    loginSchema,
    googleLoginSchema,
    refreshSchema,
    passwordSchema,
    resendEmailSchema,
    mealSchema,
    dailyMealsSchema,
    dailyIntakeJoiSchema,
};
