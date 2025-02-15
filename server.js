const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 4000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`)
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
