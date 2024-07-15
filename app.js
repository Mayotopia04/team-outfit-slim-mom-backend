const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const authRouter = require("./routes/api/auth");
const productsRouter = require("./routes/api/products");
const dailyNutritionsRouter = require("./routes/api/dailyNutritions");
const dailyIntakeRouter = require("./routes/api/dailyIntakeRoutes");
const developersRouter = require("./routes/api/developers");

const openapiFile = path.join(__dirname, 'swagger-documentation', 'openapi.json');
const openapiData = JSON.parse(fs.readFileSync(openapiFile, 'utf8'));

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(logger(formatsLogger));

app.use(express.json());

app.use("/api/users", authRouter);

app.use("/api/products", productsRouter);
app.use("/api/dailynutritions", dailyNutritionsRouter);
app.use("/api/daily-intake", dailyIntakeRouter);
app.use("/api/developers", developersRouter);
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(openapiData));
app.use("/public", express.static("public"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
